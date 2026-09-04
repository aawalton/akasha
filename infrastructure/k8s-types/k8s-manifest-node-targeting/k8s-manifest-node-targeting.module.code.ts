import { HOSTNAME_KEY, WORKLOAD_CLASS_KEY } from "../hostnames/hostnames.module.code.ts"
import {
  childBlock,
  type DocSpan,
  parseMappingLine,
  type RawLine,
  resolveMappingPath,
  type ScanError,
  unquote,
} from "../k8s-manifest-walker/k8s-manifest-walker.module.code.ts"

function nodeSelectorPathFor(kind: string | undefined): readonly string[] | null {
  if (kind === undefined) return null
  switch (kind) {
    case "Pod":
      return ["spec"]
    case "Deployment":
    case "StatefulSet":
    case "DaemonSet":
    case "Job":
      return ["spec", "template", "spec"]
    case "CronJob":
      return ["spec", "jobTemplate", "spec", "template", "spec"]
    default:
      return null
  }
}

export function readNodeSelector(
  lines: readonly RawLine[],
  span: DocSpan,
  kind: string | undefined
): {
  keys: readonly string[]
  hostname: string | undefined
  workloadClass: string | undefined
  errors: readonly ScanError[]
} {
  const errors: ScanError[] = []
  const path = nodeSelectorPathFor(kind)
  if (path === null) return { keys: [], hostname: undefined, workloadClass: undefined, errors }
  const podSpec = resolveMappingPath(lines, span, path)
  if (podSpec === null) return { keys: [], hostname: undefined, workloadClass: undefined, errors }

  const nodeSelector = childBlock(
    lines,
    { startIndex: podSpec.startIndex, endIndex: podSpec.endIndex },
    "nodeSelector",
    podSpec.indent
  )
  if (nodeSelector === null) {
    return { keys: [], hostname: undefined, workloadClass: undefined, errors }
  }

  const keys: string[] = []
  let hostname: string | undefined
  let workloadClass: string | undefined
  const seen = new Set<string>()
  const firstNodeSelectorLine = lines[nodeSelector.startIndex]
  if (firstNodeSelectorLine === undefined) {
    return { keys: [], hostname: undefined, workloadClass: undefined, errors }
  }
  const childIndent = firstNodeSelectorLine.indent
  for (let i = nodeSelector.startIndex; i < nodeSelector.endIndex; i++) {
    const ln = lines[i]
    if (ln === undefined) continue
    if (ln.blank) continue
    if (ln.indent !== childIndent) {
      if (ln.indent > childIndent) {
        errors.push({
          line: ln.lineNumber,
          message: `unexpected nested block under nodeSelector`,
        })
      }
      continue
    }
    const parsed = parseMappingLine(ln.stripped)
    if (parsed === null) continue
    if (seen.has(parsed.key)) {
      errors.push({
        line: ln.lineNumber,
        message: `duplicate nodeSelector key "${parsed.key}"`,
      })
      continue
    }
    seen.add(parsed.key)
    keys.push(parsed.key)
    if (parsed.key === HOSTNAME_KEY && parsed.value !== undefined) {
      hostname = unquote(parsed.value)
    }
    if (parsed.key === WORKLOAD_CLASS_KEY && parsed.value !== undefined) {
      workloadClass = unquote(parsed.value)
    }
  }
  return { keys, hostname, workloadClass, errors }
}

export function readPodAffinity(
  lines: readonly RawLine[],
  span: DocSpan,
  kind: string | undefined
): boolean {
  const path = nodeSelectorPathFor(kind)
  if (path === null) return false
  const podSpec = resolveMappingPath(lines, span, path)
  if (podSpec === null) return false

  const affinity = childBlock(
    lines,
    { startIndex: podSpec.startIndex, endIndex: podSpec.endIndex },
    "affinity",
    podSpec.indent
  )
  if (affinity === null) return false

  const firstAffinityLine = lines[affinity.startIndex]
  if (firstAffinityLine === undefined) return false
  const podAffinity = childBlock(
    lines,
    { startIndex: affinity.startIndex, endIndex: affinity.endIndex },
    "podAffinity",
    firstAffinityLine.indent
  )
  return podAffinity !== null
}

export function readNodeName(
  lines: readonly RawLine[],
  span: DocSpan,
  kind: string | undefined
): string | undefined {
  const path = nodeSelectorPathFor(kind)
  if (path === null) return undefined
  const podSpec = resolveMappingPath(lines, span, path)
  if (podSpec === null) return undefined

  for (let i = podSpec.startIndex; i < podSpec.endIndex; i++) {
    const ln = lines[i]
    if (ln === undefined) continue
    if (ln.blank) continue
    if (ln.indent !== podSpec.indent) continue
    const parsed = parseMappingLine(ln.stripped)
    if (parsed === null) continue
    if (parsed.key !== "nodeName") continue
    if (parsed.value === undefined) continue
    return unquote(parsed.value)
  }
  return undefined
}

function parseEntryLine(stripped: string): { key: string; value: string | undefined } | null {
  const trimmed = stripped.trimStart()
  if (trimmed.startsWith("- ")) return parseMappingLine(trimmed.slice(2).trim())
  return parseMappingLine(stripped)
}

export function readPodNodeAffinityKeys(
  lines: readonly RawLine[],
  span: DocSpan,
  kind: string | undefined
): readonly string[] {
  const path = nodeSelectorPathFor(kind)
  if (path === null) return []
  const podSpec = resolveMappingPath(lines, span, path)
  if (podSpec === null) return []

  const affinity = childBlock(
    lines,
    { startIndex: podSpec.startIndex, endIndex: podSpec.endIndex },
    "affinity",
    podSpec.indent
  )
  if (affinity === null) return []
  const firstAffinityLine = lines[affinity.startIndex]
  if (firstAffinityLine === undefined) return []
  const nodeAffinity = childBlock(
    lines,
    { startIndex: affinity.startIndex, endIndex: affinity.endIndex },
    "nodeAffinity",
    firstAffinityLine.indent
  )
  if (nodeAffinity === null) return []

  const keys: string[] = []
  let matchIndent = -1
  for (let i = nodeAffinity.startIndex; i < nodeAffinity.endIndex; i++) {
    const ln = lines[i]
    if (ln === undefined) continue
    if (ln.blank) continue
    if (matchIndent !== -1 && ln.indent <= matchIndent) matchIndent = -1
    const entry = parseEntryLine(ln.stripped)
    if (entry === null) continue
    if (entry.key === "matchExpressions" || entry.key === "matchFields") {
      matchIndent = ln.indent
      continue
    }
    if (matchIndent === -1) continue
    if (entry.key !== "key") continue
    if (entry.value === undefined) continue
    keys.push(unquote(entry.value))
  }
  return keys
}
