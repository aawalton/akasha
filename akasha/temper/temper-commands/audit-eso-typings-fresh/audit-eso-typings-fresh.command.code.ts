import { existsSync, readFileSync, realpathSync } from "node:fs"
import { resolve } from "node:path"
import type { Answer } from "@akasha/command-system/calling"
import { answering, refused } from "@akasha/command-system/calling"
import { saidBy } from "@akasha/command-system/fault-saying"
import { codeRoot } from "@akasha/pages-system/code-root"
import {
  buildEsoClonePopulation,
  WALK_ROOT,
} from "@akasha/temper-build-deploy-checks/eso-clone-artifacts"
import type { StampedArtifact } from "@akasha/temper-build-deploy-checks/eso-doc-api-version"
import { parseEsoDocApiVersion } from "@akasha/temper-eso-paths/eso-clone-stamp"
import { esouiDocPath } from "@akasha/temper-eso-paths/eso-paths"
// The rendering of an audit reading still stands whole under `tools/lib`; the
// akasha module beside it carries the summary alone.
import { renderAuditReading, summarizeAudit } from "@tools/lib/audit-reading"

const OPERATIONAL = 3

const SUBJECT = "clone-derived ESO artifacts stamped behind the ~/esoui clone"

const MAX_REPORTED = 20

const REPO_ROOT_FLAG = "--repo-root"

const ESO_DOC_FLAG = "--eso-doc"

const JSON_FLAG = "--json"

function valueOf(argv: readonly string[], flag: string): string | undefined {
  for (let at = 0; at < argv.length; at += 1) {
    if (argv[at] === flag) return argv[at + 1]
  }
  return undefined
}

function saidShort(thrown: unknown): string {
  return saidBy(thrown).replace(/\s+/g, " ").trim()
}

function realOrGiven(path: string): string {
  try {
    return realpathSync(path)
  } catch {
    return path
  }
}

export function auditEsoTypingsFresh(argv: readonly string[] = []): Answer {
  const namedRepo = valueOf(argv, REPO_ROOT_FLAG)
  const repoRoot = realOrGiven(namedRepo === undefined ? codeRoot() : resolve(namedRepo))

  const namedDoc = valueOf(argv, ESO_DOC_FLAG)
  const docPath = realOrGiven(namedDoc === undefined ? esouiDocPath() : resolve(namedDoc))

  if (!existsSync(docPath)) {
    return refused(
      `${docPath} is not there, so there was no clone version to weigh any committed stamp against ` +
        "and nothing was measured. The clone is the whole other side of this reading — restore it " +
        "with `git clone https://github.com/esoui/esoui.git ~/esoui`, or name another copy with " +
        "--eso-doc. This is the condition the check it came from swallowed, dropping to a weaker " +
        "comparison and still passing.",
      OPERATIONAL
    )
  }

  let cloneApiVersion: number
  try {
    cloneApiVersion = parseEsoDocApiVersion(readFileSync(docPath, "utf8"))
  } catch (thrown) {
    return refused(
      `${docPath} yielded no API version, so every committed stamp would read as agreeing with ` +
        `nothing rather than being weighed against the clone — ${saidShort(thrown)}`,
      OPERATIONAL
    )
  }

  let artifacts: readonly StampedArtifact[]
  let filesScanned: number
  try {
    const population = buildEsoClonePopulation(repoRoot)
    artifacts = population.artifacts
    filesScanned = population.filesScanned
  } catch (thrown) {
    return refused(
      `the walk over ${WALK_ROOT} in ${repoRoot} did not finish, so no population of ` +
        `clone-derived artifacts was gathered — ${saidShort(thrown)}`,
      OPERATIONAL
    )
  }

  if (artifacts.length === 0) {
    return refused(
      `none of the ${String(filesScanned)} generated file(s) under ${WALK_ROOT} in ${repoRoot} ` +
        "carries a clone provenance line, so no artifact was weighed against the clone. Every " +
        "clone-derived artifact carries one, so an empty population means the walk lost them " +
        "rather than that they are all current.",
      OPERATIONAL
    )
  }

  const unstamped = artifacts.filter((one) => one.version === null).map((one) => one.label)
  const stamped = artifacts.filter(
    (one): one is StampedArtifact & { version: number } => one.version !== null
  )

  if (stamped.length === 0) {
    return refused(
      `all ${String(artifacts.length)} clone-derived artifact(s) in ${repoRoot} carry no ` +
        "API version stamp, so none could be weighed against the clone and a clean run would say " +
        "only that nothing was looked at. The freshness check is what reports an unstamped artifact.",
      OPERATIONAL
    )
  }

  const findings = stamped
    .filter((one) => one.version !== cloneApiVersion)
    .map((one) => ({ label: one.label, stamped: one.version, generator: one.generator }))
    .sort((one, other) => one.label.localeCompare(other.label))

  const audit = {
    reading: summarizeAudit({
      scanned: artifacts.length,
      compared: stamped.length,
      findings: findings.length,
      coverage: "complete" as const,
    }),
    repoRoot,
    docPath,
    cloneApiVersion,
    walkRoot: WALK_ROOT,
    filesScanned,
    generators: new Set(artifacts.map((one) => one.generator)).size,
    artifacts: artifacts.length,
    unstamped,
    compared: stamped.length,
    findings,
    observedAtMs: Date.now(),
  }

  if (argv.includes(JSON_FLAG)) return answering([JSON.stringify(audit)], [], 0)

  const lines = [...renderAuditReading(SUBJECT, audit.reading)]
  lines.push(
    `  POPULATION: ${String(artifacts.length)} clone-derived artifact(s) of ` +
      `${String(filesScanned)} generated file(s) under ${WALK_ROOT} in ${repoRoot}, by ` +
      `${String(audit.generators)} generator(s), against clone API version ` +
      `${String(cloneApiVersion)} from ${docPath}.`
  )
  lines.push(
    `  DENOMINATOR: ${String(stamped.length)} artifact(s) were compared, after ` +
      `${String(unstamped.length)} set aside carrying no API version stamp to compare.`
  )
  for (const label of unstamped.slice(0, MAX_REPORTED)) {
    lines.push(`    ${label} — unstamped, so nothing here weighs it; the freshness check does`)
  }
  if (findings.length === 0) {
    lines.push(
      `    Every artifact compared is stamped ${String(cloneApiVersion)}, current with the clone.`
    )
    return answering(lines, [], 0)
  }

  lines.push(
    `  BEHIND THE CLONE: ${String(findings.length)} of ${String(stamped.length)} artifact(s) compared.`
  )
  for (const one of findings.slice(0, MAX_REPORTED)) {
    lines.push(
      `    ${one.label} — stamped ${String(one.stamped)}, clone at ${String(cloneApiVersion)}; ` +
        `rebuild it with \`${one.generator}\``
    )
  }
  if (findings.length > MAX_REPORTED) {
    lines.push(
      `    and ${String(findings.length - MAX_REPORTED)} more, not listed; --json carries every one`
    )
  }
  return answering(lines, [], 0)
}
