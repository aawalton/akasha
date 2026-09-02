import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { ran as running } from "@akasha/utils-run/running"
import type { Workload } from "../web-app-reading/web-app-reading.module.code.ts"

const KUBECTL = "kubectl"
const GENERATED = "generated"
const GENERATED_SUFFIX = ".generated.yaml"
const NAMESPACE_KIND = "Namespace"
const ROLLED_OUT: ReadonlySet<string> = new Set(["Deployment", "StatefulSet", "DaemonSet"])
const ROLLOUT_WAIT = "5m"
const ASKING_WAIT = "1s"
const KIND_AT = "kind:"
const METADATA_AT = "metadata:"
const NAME_AT = "name:"
const NAMESPACE_AT = "namespace:"
const NESTED = "    "
const UNDER = "  "
const LEFT_TO_FILL =
  /^\s*(checksum\/[A-Za-z0-9][A-Za-z0-9._-]*):[ \t]*(?!["']?[0-9a-f]{32,64}["']?[ \t]*$)\S.*$/gm
const NOT_YET_KNOWN = /^\s*(image):\s*\S*MUST_BE_SET\S*\s*$/gm

export interface Ran {
  readonly argv: readonly string[]
  readonly code: number
  readonly stdout: string
  readonly stderr: string
}

export interface Manifest {
  readonly name: string
  readonly path: string
  readonly yaml: string
  readonly kind: string
  readonly resourceName: string
  readonly namespace: string | null
}

export interface Plan {
  readonly workload: Workload
  readonly synthPath: string
  readonly manifests: readonly Manifest[]
}

export type Named = {
  readonly kind: string
  readonly name: string
  readonly namespace: string | null
}

export function runKubectl(argv: readonly string[]): Ran {
  const done = running([KUBECTL, ...argv])
  return { argv, code: done.code, stdout: done.out, stderr: done.err }
}

export function runKubectlOn(argv: readonly string[], said: string): Ran {
  const done = running([KUBECTL, ...argv], { stdin: new TextEncoder().encode(said) })
  return { argv, code: done.code, stdout: done.out, stderr: done.err }
}

function said(line: string, at: string): string {
  return line
    .slice(at.length)
    .trim()
    .replace(/^["']|["']$/g, "")
}

export function namedIn(yaml: string): Named | null {
  let kind: string | null = null
  let name: string | null = null
  let namespace: string | null = null
  let inMetadata = false
  for (const line of yaml.split("\n")) {
    if (!line.startsWith(" ")) {
      if (line.startsWith(KIND_AT)) kind = said(line, KIND_AT)
      inMetadata = line.startsWith(METADATA_AT)
      continue
    }
    if (!inMetadata || line.startsWith(NESTED)) continue
    const held = line.slice(UNDER.length)
    if (held.startsWith(NAME_AT)) name = said(held, NAME_AT)
    if (held.startsWith(NAMESPACE_AT)) namespace = said(held, NAMESPACE_AT)
  }
  if (kind === null || name === null) return null
  return { kind, name, namespace }
}

export function generatedPathFor(synthPath: string, name: string): string {
  return join(dirname(synthPath), GENERATED, `${name}${GENERATED_SUFFIX}`)
}

export function carries(manifest: Manifest, workload: Workload): boolean {
  return (
    manifest.kind === workload.kind &&
    manifest.resourceName === workload.name &&
    (manifest.namespace ?? workload.namespace) === workload.namespace
  )
}

export function opensTheNamespace(manifest: Manifest, workload: Workload): boolean {
  return manifest.kind === NAMESPACE_KIND && manifest.resourceName === workload.namespace
}

export function inApplyOrder(
  manifests: readonly Manifest[],
  workload: Workload
): readonly Manifest[] {
  const opening = manifests.filter((one) => opensTheNamespace(one, workload))
  const carrying = manifests.filter((one) => carries(one, workload))
  const between = manifests.filter((one) => !opening.includes(one) && !carrying.includes(one))
  return [...opening, ...between, ...carrying]
}

export async function planFor(
  root: string,
  workload: Workload,
  synthPath: string
): Promise<Plan | string> {
  let emitted: unknown
  try {
    const loaded: unknown = await import(join(root, synthPath))
    const made = (loaded as Record<string, unknown>).default
    if (typeof made !== "function") {
      return `${synthPath} exports no default function, so it emits no manifests`
    }
    emitted = await (made as () => unknown)()
  } catch (thrown) {
    return `${synthPath} would not load: ${thrown instanceof Error ? thrown.message : String(thrown)}`
  }
  if (!Array.isArray(emitted)) return `${synthPath} emitted no list of manifests`
  const manifests: Manifest[] = []
  for (const one of emitted) {
    const entry = one as { name?: unknown; yaml?: unknown }
    if (typeof entry.name !== "string" || typeof entry.yaml !== "string") {
      return `${synthPath} emitted an entry carrying no name and body`
    }
    const found = namedIn(entry.yaml)
    if (found === null) return `${synthPath} emitted \`${entry.name}\` naming no resource`
    manifests.push({
      name: entry.name,
      path: generatedPathFor(synthPath, entry.name),
      yaml: entry.yaml,
      kind: found.kind,
      resourceName: found.name,
      namespace: found.namespace,
    })
  }
  if (!manifests.some((one) => carries(one, workload))) {
    return `${synthPath} emits no ${workload.kind}/${workload.name} in namespace ${workload.namespace}, which is the workload the page names`
  }
  return { workload, synthPath, manifests: inApplyOrder(manifests, workload) }
}

export function unfilledIn(manifest: Manifest): readonly string[] {
  const left: string[] = []
  for (const found of manifest.yaml.matchAll(LEFT_TO_FILL)) {
    if (found[1] !== undefined) left.push(`${found[1]} is a checksum nothing filled in`)
  }
  for (const found of manifest.yaml.matchAll(NOT_YET_KNOWN)) {
    if (found[1] !== undefined) left.push(`${found[1]} is an image nothing filled in`)
  }
  return left
}

export function unfilledOf(plan: Plan): readonly string[] {
  return plan.manifests.flatMap((one) => unfilledIn(one).map((why) => `${one.path}: ${why}`))
}

export type Matched = { readonly stands: boolean } | { readonly why: string }

export function appliedOf(manifest: Manifest): Matched {
  const ran = runKubectlOn(["diff", "-f", "-"], manifest.yaml)
  if (ran.code === 0) return { stands: true }
  if (ran.code === 1) return { stands: false }
  return { why: `kubectl diff for ${manifest.path} exited ${ran.code}: ${ran.stderr.trim()}` }
}

export function upAlready(workload: Workload): boolean {
  if (ROLLED_OUT.has(workload.kind)) {
    return (
      runKubectl([
        "rollout",
        "status",
        `${workload.kind.toLowerCase()}/${workload.name}`,
        "-n",
        workload.namespace,
        "--timeout",
        ASKING_WAIT,
      ]).code === 0
    )
  }
  return (
    runKubectl(["get", workload.kind, workload.name, "-n", workload.namespace, "-o", "name"])
      .code === 0
  )
}

export function writeManifests(root: string, plan: Plan): readonly string[] {
  const written: string[] = []
  for (const manifest of plan.manifests) {
    const at = join(root, manifest.path)
    let held: string | null = null
    try {
      held = readFileSync(at, "utf8")
    } catch {
      held = null
    }
    if (held === manifest.yaml) continue
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, manifest.yaml, "utf8")
    written.push(manifest.path)
  }
  return written
}

export function applyOf(plan: Plan, manifest: Manifest): readonly string[] {
  const placed = opensTheNamespace(manifest, plan.workload) ? [] : ["-n", plan.workload.namespace]
  return ["apply", "--server-side", "--force-conflicts", ...placed, "-f", "-"]
}

export function rolloutOf(plan: Plan): readonly string[] | null {
  if (!ROLLED_OUT.has(plan.workload.kind)) return null
  return [
    "rollout",
    "status",
    `${plan.workload.kind.toLowerCase()}/${plan.workload.name}`,
    "-n",
    plan.workload.namespace,
    "--timeout",
    ROLLOUT_WAIT,
  ]
}

export function putUp(plan: Plan): readonly Ran[] {
  const ran: Ran[] = []
  for (const manifest of plan.manifests) {
    const one = runKubectlOn(applyOf(plan, manifest), manifest.yaml)
    ran.push(one)
    if (one.code !== 0) return ran
  }
  const rollout = rolloutOf(plan)
  if (rollout !== null) ran.push(runKubectl(rollout))
  return ran
}
