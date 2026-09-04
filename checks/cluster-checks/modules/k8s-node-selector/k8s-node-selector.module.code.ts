import {
  GPU_VRAM_TIERS,
  gpuVramUsableMinKey,
  WORKLOAD_CLASSES,
  workloadClassMemberKey,
} from "@akasha/k8s-types/hostnames"
import { WORKLOAD_CLASS_SELECTOR_KEY } from "@akasha/k8s-types/k8s-manifest-scanner"
import { isTestFilePath } from "../non-test-population/non-test-population.module.code.ts"

export type ViolationKind =
  | "role-selector"
  | "ts-literal"
  | "node-name"
  | "affinity-selector"
  | "ts-node-name"

export interface Violation {
  kind: ViolationKind
  file: string
  line: number
  manifestKind?: string
  name?: string
  key?: string
  message: string
}

export interface ManifestNodeAttrs {
  path: string
  kind: string
  name: string
  hasPodTemplate: boolean
  nodeSelectorKeys: readonly string[]
  nodeName: string | null
  nodeAffinityKeys: readonly string[]
  startLine: number
}

const ACCEPTED_SELECTOR_KEYS: ReadonlySet<string> = new Set([WORKLOAD_CLASS_SELECTOR_KEY])

const WORKLOAD_CLASS_MEMBER_KEYS: ReadonlySet<string> = new Set(
  WORKLOAD_CLASSES.map((c) => workloadClassMemberKey(c))
)

const GPU_VRAM_TIER_KEYS: ReadonlySet<string> = new Set(
  GPU_VRAM_TIERS.map((tier) => gpuVramUsableMinKey(tier))
)

function isAcceptedSelectorKey(key: string): boolean {
  return (
    ACCEPTED_SELECTOR_KEYS.has(key) ||
    WORKLOAD_CLASS_MEMBER_KEYS.has(key) ||
    GPU_VRAM_TIER_KEYS.has(key)
  )
}

const NODE_NAME_ALLOW: ReadonlySet<string> = new Set([
  "akasha/infrastructure/voice-inference/voice-infer.cluster-service.code.attachment.ts",
  "infra/voice-infer/generated/deployment.generated.yaml",
])

export const ACCEPTED_SELECTOR_KEYS_HUMAN = `${[...ACCEPTED_SELECTOR_KEYS]
  .map((k) => `"${k}"`)
  .join(
    " or "
  )} (or an "alanwalton.com/workload-class.<class>" membership key, or an "alanwalton.com/gpu-vram-usable-min.<tier>" GPU-capacity key)`

export function evaluateManifestNode(attrs: ManifestNodeAttrs): readonly Violation[] {
  if (!attrs.hasPodTemplate) return []
  const violations: Violation[] = []

  if (attrs.kind !== "DaemonSet") {
    for (const key of attrs.nodeSelectorKeys) {
      if (isAcceptedSelectorKey(key)) continue
      violations.push({
        kind: "role-selector",
        file: attrs.path,
        line: attrs.startLine,
        manifestKind: attrs.kind,
        name: attrs.name,
        key,
        message: `${attrs.kind} ${attrs.name}: forbidden nodeSelector key "${key}" (only ${ACCEPTED_SELECTOR_KEYS_HUMAN} allowed)`,
      })
    }

    for (const key of attrs.nodeAffinityKeys) {
      if (isAcceptedSelectorKey(key)) continue
      violations.push({
        kind: "affinity-selector",
        file: attrs.path,
        line: attrs.startLine,
        manifestKind: attrs.kind,
        name: attrs.name,
        key,
        message: `${attrs.kind} ${attrs.name}: forbidden nodeAffinity key "${key}" (only ${ACCEPTED_SELECTOR_KEYS_HUMAN} allowed)`,
      })
    }
  }

  if (attrs.hasPodTemplate && attrs.nodeName !== null && !NODE_NAME_ALLOW.has(attrs.path)) {
    violations.push({
      kind: "node-name",
      file: attrs.path,
      line: attrs.startLine,
      manifestKind: attrs.kind,
      name: attrs.name,
      key: attrs.nodeName,
      message: `${attrs.kind} ${attrs.name}: forbidden nodeName "${attrs.nodeName}" — nodeName bypasses the scheduler (no fit check, no Pending queue), so a capacity shortfall is hard-rejected instead of queued. State the requirement as a nodeSelector on ${ACCEPTED_SELECTOR_KEYS_HUMAN}`,
    })
  }

  return violations
}

const TS_LITERAL_ALLOW: ReadonlySet<string> = new Set([
  "akasha/infrastructure/k8s-types/hostnames/hostnames.module.code.ts",
])

const TS_LITERAL_RE =
  /"kubernetes\.io\/hostname"|"alanwalton\.com\/workload-class(?:\.[a-z][a-z0-9-]*)?"|"alanwalton\.com\/gpu-(?:vram-usable-mib|compute-cap|vram-usable-min\.[a-z0-9]+)"/

export function scanTsContent(content: string, relPath: string): readonly Violation[] {
  if (TS_LITERAL_ALLOW.has(relPath)) return []
  if (!TS_LITERAL_RE.test(content)) return []

  const violations: Violation[] = []
  const lines = content.split("\n")
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line !== undefined && TS_LITERAL_RE.test(line)) {
      violations.push({
        kind: "ts-literal",
        file: relPath,
        line: i + 1,
        message:
          "forbidden double-quoted selector-key literal — import HOSTNAME_KEY / WORKLOAD_CLASS_KEY from @akasha/k8s-types/hostnames and use hostnameSelector(...) / capabilitySelector(...) / yamlHostnamePinLines(...)",
      })
    }
  }
  return violations
}

const POD_SPEC_CONTAINERS_RE = /^[^\S\n]*"?containers"?\s*:\s*\[/m

export function authorsPodSpecTs(content: string, relPath: string): boolean {
  if (isTestFilePath(relPath)) return false
  return POD_SPEC_CONTAINERS_RE.test(content)
}

const TS_NODE_NAME_RE = /^\s*nodeName\s*:/

export function scanTsNodeName(content: string, relPath: string): readonly Violation[] {
  if (!authorsPodSpecTs(content, relPath)) return []
  if (NODE_NAME_ALLOW.has(relPath)) return []

  const violations: Violation[] = []
  const lines = content.split("\n")
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line !== undefined && TS_NODE_NAME_RE.test(line)) {
      violations.push({
        kind: "ts-node-name",
        file: relPath,
        line: i + 1,
        message:
          "forbidden pod-spec nodeName — nodeName bypasses the scheduler (no fit check, no Pending queue), so a capacity shortfall is hard-rejected instead of queued, and an un-retryable pod is lost outright. State the requirement as a nodeSelector: capabilitySelector(...) / workloadClassMemberSelector(...) / gpuVramUsableMinSelector(...)",
      })
    }
  }
  return violations
}
