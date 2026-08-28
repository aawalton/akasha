import { HOSTNAME_KEY, WORKLOAD_CLASS_KEY } from "./hostnames.ts"
import { ORCHESTRATOR_CACHE_REPO_PATH } from "./orchestrator-cache-locations.ts"
import { type ContainerResources, readContainerProbes } from "./k8s-container-probes.ts"
import {
  readNodeName,
  readNodeSelector,
  readPodAffinity,
  readPodNodeAffinityKeys,
} from "./k8s-manifest-node-targeting.ts"
import {
  childBlock,
  type DocSpan,
  lex,
  parseMappingLine,
  type RawLine,
  type ScanError,
  splitDocs,
  unquote,
} from "./k8s-manifest-walker.ts"


export interface ImageLine {
  readonly value: string
  readonly line: number
}

export interface K8sDoc {
  readonly startLine: number
  readonly endLine: number
  readonly apiVersion: string | undefined
  readonly kind: string | undefined
  readonly name: string | undefined
  readonly namespace: string | undefined
  readonly nodeSelectorKeys: readonly string[]
  readonly hostnameSelector: string | undefined
  readonly workloadClassSelector: string | undefined
  readonly hasPodTemplate: boolean
  readonly hasPodAffinity: boolean
  readonly nodeName: string | undefined
  readonly nodeAffinityKeys: readonly string[]
  readonly containerResources: readonly ContainerResources[]
  readonly imageLines: readonly ImageLine[]
  readonly repoPaths: readonly string[]
}

export interface ScanResult {
  readonly docs: readonly K8sDoc[]
  readonly errors: readonly ScanError[]
}

export const POD_TEMPLATE_KINDS: ReadonlySet<string> = new Set([
  "Deployment",
  "StatefulSet",
  "DaemonSet",
  "Job",
  "CronJob",
])

export const PIN_REQUIRED_KINDS: ReadonlySet<string> = new Set(
  [...POD_TEMPLATE_KINDS].filter((k) => k !== "DaemonSet")
)

export const HOSTNAME_SELECTOR_KEY = HOSTNAME_KEY

export const WORKLOAD_CLASS_SELECTOR_KEY = WORKLOAD_CLASS_KEY

function topLevelEntries(
  lines: readonly RawLine[],
  span: DocSpan
): {
  entries: Map<string, { value: string | undefined; line: number }>
  errors: readonly ScanError[]
} {
  const out = new Map<string, { value: string | undefined; line: number }>()
  const errors: ScanError[] = []
  for (let i = span.startIndex; i < span.endIndex; i++) {
    const ln = lines[i]
    if (ln === undefined) continue
    if (ln.blank) continue
    if (ln.indent !== 0) continue
    const parsed = parseMappingLine(ln.stripped)
    if (parsed === null) continue
    if (out.has(parsed.key)) {
      errors.push({
        line: ln.lineNumber,
        message: `duplicate top-level key "${parsed.key}"`,
      })
      continue
    }
    out.set(parsed.key, { value: parsed.value, line: ln.lineNumber })
  }
  return { entries: out, errors }
}

function readMetadata(
  lines: readonly RawLine[],
  span: DocSpan
): {
  name: string | undefined
  namespace: string | undefined
  errors: readonly ScanError[]
} {
  const errors: ScanError[] = []
  const metadata = childBlock(lines, span, "metadata", 0)
  if (metadata === null) return { name: undefined, namespace: undefined, errors }

  let name: string | undefined
  let namespace: string | undefined
  const seen = new Set<string>()
  const firstMetadataLine = lines[metadata.startIndex]
  if (firstMetadataLine === undefined) return { name: undefined, namespace: undefined, errors }
  const childIndent = firstMetadataLine.indent
  for (let i = metadata.startIndex; i < metadata.endIndex; i++) {
    const ln = lines[i]
    if (ln === undefined) continue
    if (ln.blank) continue
    if (ln.indent !== childIndent) continue
    const parsed = parseMappingLine(ln.stripped)
    if (parsed === null) continue
    if (seen.has(parsed.key)) {
      errors.push({
        line: ln.lineNumber,
        message: `duplicate metadata key "${parsed.key}"`,
      })
      continue
    }
    seen.add(parsed.key)
    if (parsed.key === "name" && parsed.value !== undefined) name = unquote(parsed.value)
    if (parsed.key === "namespace" && parsed.value !== undefined) namespace = unquote(parsed.value)
  }
  return { name, namespace, errors }
}

function readImageLines(lines: readonly RawLine[], span: DocSpan): readonly ImageLine[] {
  const out: ImageLine[] = []
  for (let i = span.startIndex; i < span.endIndex; i++) {
    const ln = lines[i]
    if (ln === undefined) continue
    if (ln.blank) continue
    const trimmed = ln.stripped.trimStart()
    const parsed = trimmed.startsWith("- ")
      ? parseMappingLine(trimmed.slice(2).trim())
      : parseMappingLine(ln.stripped)
    if (parsed === null) continue
    if (parsed.key !== "image") continue
    if (parsed.value === undefined) continue
    out.push({ value: unquote(parsed.value), line: ln.lineNumber })
  }
  return out
}

const CACHE_ROOT_ESCAPED = ORCHESTRATOR_CACHE_REPO_PATH.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

const REPO_TS_PATH_PATTERN = new RegExp(
  `(?:${CACHE_ROOT_ESCAPED}/|(?<![A-Za-z0-9._@/-]))((?:[A-Za-z0-9._@-]+/)+[A-Za-z0-9._@-]+\\.tsx?)\\b`,
  "g"
)

function readRepoPaths(lines: readonly RawLine[], span: DocSpan): readonly string[] {
  const seen = new Set<string>()
  const out: string[] = []
  for (let i = span.startIndex; i < span.endIndex; i++) {
    const ln = lines[i]
    if (ln === undefined) continue
    if (ln.blank) continue
    for (const match of ln.stripped.matchAll(REPO_TS_PATH_PATTERN)) {
      const path = match[1]
      if (path === undefined) continue
      if (seen.has(path)) continue
      seen.add(path)
      out.push(path)
    }
  }
  return out
}

export function scanManifestText(text: string): ScanResult {
  const errors: ScanError[] = []
  const lines = lex(text)
  const docs: K8sDoc[] = []

  for (const span of splitDocs(lines, text)) {
    const topResult = topLevelEntries(lines, span)
    errors.push(...topResult.errors)
    const top = topResult.entries
    const apiVersion = top.get("apiVersion")?.value
    const kindRaw = top.get("kind")?.value
    const apiVersionParsed = apiVersion === undefined ? undefined : unquote(apiVersion)
    const kind = kindRaw === undefined ? undefined : unquote(kindRaw)
    const metaResult = readMetadata(lines, span)
    errors.push(...metaResult.errors)
    const { name, namespace } = metaResult
    const nsResult = readNodeSelector(lines, span, kind)
    errors.push(...nsResult.errors)
    const { keys, hostname, workloadClass } = nsResult
    const hasPodTemplate = kind !== undefined && POD_TEMPLATE_KINDS.has(kind)
    const hasPodAffinity = readPodAffinity(lines, span, kind)
    const nodeName = readNodeName(lines, span, kind)
    const nodeAffinityKeys = readPodNodeAffinityKeys(lines, span, kind)
    const containerResources = readContainerProbes(lines, span)
    const imageLines = readImageLines(lines, span)
    const repoPaths = readRepoPaths(lines, span)

    docs.push({
      startLine: span.startLine,
      endLine: span.endLine,
      apiVersion: apiVersionParsed,
      kind,
      name,
      namespace,
      nodeSelectorKeys: keys,
      hostnameSelector: hostname,
      workloadClassSelector: workloadClass,
      hasPodTemplate,
      hasPodAffinity,
      nodeName,
      nodeAffinityKeys,
      containerResources,
      imageLines,
      repoPaths,
    })
  }

  return { docs, errors }
}
