import { checksumKeysSubstitutedIn } from "../checksum-annotation-substitution/checksum-annotation-substitution.module.code.ts"
import type { Violation } from "../violation-reporting/violation-reporting.module.code.ts"

export interface ChecksumSubstitutionStep {
  readonly workflow: string
  readonly sourcePath: string
  readonly step: string
  readonly commands: readonly string[]
}

export interface ChecksumSubstitutionReachabilityViolation extends Violation {
  readonly kind: "checksum-substitution-skip-gated"
  readonly workflow: string
  readonly step: string
  readonly file: string
  readonly keys: readonly string[]
  readonly gate: string
  readonly liveRead: string
  readonly message: string
}

const CONTENT_HASH_ASSIGNMENT_RE = /^\s*CONTENT_HASH=/

const HASH_EARLY_EXIT_RE = /\bif\b[^\n]*\$\{?[A-Za-z_]*HASH[A-Za-z_]*\}?[^\n]*\bexit\s+0\b/

const LIVE_OBJECT_READ_RE = /\bkubectl\s+get\s+(?:secrets?|configmaps?|cm)\b/

const DIGEST_RE = /\b(?:md5sum|sha1sum|sha256sum|sha512sum|shasum|cksum)\b/

function commandLines(commands: readonly string[]): readonly string[] {
  return commands.flatMap((command) => command.split("\n"))
}

export function findSkipGateLine(commands: readonly string[]): string | null {
  for (const line of commandLines(commands)) {
    if (CONTENT_HASH_ASSIGNMENT_RE.test(line)) return line.trim()
    if (HASH_EARLY_EXIT_RE.test(line)) return line.trim()
  }
  return null
}

export function findLiveObjectHashLine(commands: readonly string[]): string | null {
  for (const line of commandLines(commands)) {
    if (LIVE_OBJECT_READ_RE.test(line) && DIGEST_RE.test(line)) return line.trim()
  }
  return null
}

export function findStampedChecksumKeys(commands: readonly string[]): readonly string[] {
  const keys: string[] = []
  for (const line of commandLines(commands)) {
    for (const key of checksumKeysSubstitutedIn(line)) {
      if (!keys.includes(key)) keys.push(key)
    }
  }
  return keys
}

export function isChecksumSubstitutionStep(step: ChecksumSubstitutionStep): boolean {
  return findStampedChecksumKeys(step.commands).length > 0
}

interface ConditionedRepair {
  readonly act: string
  readonly onlyWhere: string
}

const REPAIRS: readonly ConditionedRepair[] = [
  {
    act: "apply the manifest unconditionally",
    onlyWhere:
      "the gate moves onto the config apply instead of the workload apply, which is the loki / " +
      "cloudflared / seaweedfs shape: the config is repo-resident, and the workload is the thing " +
      "that has to roll when something out of band moves",
  },
  {
    act: "hash a repo-resident subject (`md5sum <path>` / `sops -d <path>`), whose change moves `ci.inputsHash` and opens the gate",
    onlyWhere:
      "the apply that writes that subject into the cluster is under the SAME gate as this " +
      "stamp, meaning one step applies it and stamps it together (`loki-apply-promtail`), or an " +
      "earlier apply is gated on the same `ci.inputsHash` so both open together (`electric`, " +
      "`postgrest`, `supabase-realtime`). Gated differently from this stamp, it is this same " +
      "defect a third way: a faithful digest of bytes the workload has not been given, both " +
      "checksum gates green, and the object arriving after the stamp can no longer roll the pod",
  },
]

function renderRepairs(): string {
  return REPAIRS.map((repair) => `${repair.act} — correct only where ${repair.onlyWhere}.`).join(
    " Or "
  )
}

export function scanChecksumSubstitutionReachability(
  steps: readonly ChecksumSubstitutionStep[]
): readonly ChecksumSubstitutionReachabilityViolation[] {
  const violations: ChecksumSubstitutionReachabilityViolation[] = []
  for (const step of steps) {
    const keys = findStampedChecksumKeys(step.commands)
    if (keys.length === 0) continue
    const gate = findSkipGateLine(step.commands)
    if (gate === null) continue
    const liveRead = findLiveObjectHashLine(step.commands)
    if (liveRead === null) continue

    violations.push({
      kind: "checksum-substitution-skip-gated",
      workflow: step.workflow,
      step: step.step,
      file: step.sourcePath,
      keys,
      gate,
      liveRead,
      message:
        `step \`${step.step}\` stamps ${keys.map((k) => `\`${k}\``).join(", ")} from a LIVE ` +
        `cluster object (\`${liveRead}\`) but early-exits on an unchanged content hash ` +
        `(\`${gate}\`). \`ci.inputsHash\` is derived from repo content, and reading the subject ` +
        `out of the cluster is the admission that it can change with no repo change — so on the ` +
        `one event this substitution exists for, the gate closes before the sed runs and the ` +
        `workload keeps the superseded value in memory with no signal. Either ` +
        renderRepairs(),
    })
  }
  return violations
}
