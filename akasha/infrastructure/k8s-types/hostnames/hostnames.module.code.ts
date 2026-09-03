export type Hostname = "node-01" | "node-02" | "node-03" | "node-04" | "node-05" | "node-06"

export const HOSTNAMES: readonly Hostname[] = [
  "node-01",
  "node-02",
  "node-03",
  "node-04",
  "node-05",
  "node-06",
] as const

export const CI_RESERVED_NODE: Hostname = "node-06"

export function asHostname(value: string): Hostname | undefined {
  return HOSTNAMES.find((h) => h === value)
}

export const HOSTNAME_KEY = "kubernetes.io/hostname" as const

export function hostnameSelector(host: Hostname): { readonly "kubernetes.io/hostname": Hostname } {
  return { [HOSTNAME_KEY]: host } as const
}

export function yamlHostnamePinLines(host: Hostname, indent: string): readonly [string, string] {
  return [`${indent}nodeSelector:`, `${indent}  ${HOSTNAME_KEY}: ${host}`] as const
}

export type WorkloadClass =
  | "control"
  | "database"
  | "build"
  | "serve"
  | "workers"
  | "ci"
  | "eso-rig"

export const WORKLOAD_CLASSES: readonly WorkloadClass[] = [
  "control",
  "database",
  "build",
  "serve",
  "workers",
  "ci",
  "eso-rig",
] as const

export const WORKLOAD_CLASS_KEY = "alanwalton.com/workload-class" as const

export function capabilitySelector(workloadClass: WorkloadClass): {
  readonly "alanwalton.com/workload-class": WorkloadClass
} {
  return { [WORKLOAD_CLASS_KEY]: workloadClass } as const
}

export function yamlCapabilityPinLines(
  workloadClass: WorkloadClass,
  indent: string
): readonly [string, string] {
  return [`${indent}nodeSelector:`, `${indent}  ${WORKLOAD_CLASS_KEY}: ${workloadClass}`] as const
}

export const WORKLOAD_CLASS_MEMBER_PREFIX = "alanwalton.com/workload-class." as const

export function workloadClassMemberKey<C extends WorkloadClass>(
  workloadClass: C
): `alanwalton.com/workload-class.${C}` {
  return `${WORKLOAD_CLASS_MEMBER_PREFIX}${workloadClass}`
}

export function workloadClassMemberSelector(
  workloadClass: WorkloadClass
): Readonly<Record<string, "true">> {
  return { [workloadClassMemberKey(workloadClass)]: "true" }
}

export function yamlWorkloadClassMemberPinLines(
  workloadClass: WorkloadClass,
  indent: string
): readonly [string, string] {
  return [
    `${indent}nodeSelector:`,
    `${indent}  ${workloadClassMemberKey(workloadClass)}: "true"`,
  ] as const
}

export const GPU_VRAM_USABLE_MIB_KEY = "alanwalton.com/gpu-vram-usable-mib" as const

export const GPU_COMPUTE_CAP_KEY = "alanwalton.com/gpu-compute-cap" as const

export const GPU_VRAM_USABLE_MIN_PREFIX = "alanwalton.com/gpu-vram-usable-min." as const

export type GpuVramTier = "8gi"

const GPU_VRAM_TIER_MIN_MIB: Readonly<Record<GpuVramTier, number>> = { "8gi": 8 * 1024 }

export const GPU_VRAM_TIERS: readonly GpuVramTier[] = ["8gi"] as const

export function gpuVramUsableMinKey<T extends GpuVramTier>(
  tier: T
): `alanwalton.com/gpu-vram-usable-min.${T}` {
  return `${GPU_VRAM_USABLE_MIN_PREFIX}${tier}`
}

export function gpuVramUsableMinSelector(tier: GpuVramTier): Readonly<Record<string, "true">> {
  return { [gpuVramUsableMinKey(tier)]: "true" }
}

export interface GpuHardware {
  readonly vramUsableMib: number
  readonly computeCapability: string
}

export function gpuHardwareLabels(gpu: GpuHardware): Readonly<Record<string, string>> {
  const labels: Record<string, string> = {
    [GPU_VRAM_USABLE_MIB_KEY]: String(gpu.vramUsableMib),
    [GPU_COMPUTE_CAP_KEY]: gpu.computeCapability,
  }
  for (const tier of GPU_VRAM_TIERS) {
    if (gpu.vramUsableMib >= GPU_VRAM_TIER_MIN_MIB[tier]) {
      labels[gpuVramUsableMinKey(tier)] = "true"
    }
  }
  return labels
}

export function colocationAffinity(
  matchLabels: Readonly<Record<string, string>>,
  namespaces: readonly string[]
): {
  readonly podAffinity: {
    readonly requiredDuringSchedulingIgnoredDuringExecution: readonly [
      {
        readonly labelSelector: { readonly matchLabels: Readonly<Record<string, string>> }
        readonly namespaces: readonly string[]
        readonly topologyKey: "kubernetes.io/hostname"
      },
    ]
  }
} {
  return {
    podAffinity: {
      requiredDuringSchedulingIgnoredDuringExecution: [
        {
          labelSelector: { matchLabels },
          namespaces,
          topologyKey: HOSTNAME_KEY,
        },
      ],
    },
  } as const
}

export const CNPG_POSTGRES_PRIMARY_LABELS = {
  "cnpg.io/cluster": "postgres-cnpg",
  "cnpg.io/instanceRole": "primary",
} as const

export function colocationAffinityPreferred(
  matchLabels: Readonly<Record<string, string>>,
  namespaces: readonly string[]
): {
  readonly podAffinity: {
    readonly preferredDuringSchedulingIgnoredDuringExecution: readonly [
      {
        readonly weight: number
        readonly podAffinityTerm: {
          readonly labelSelector: { readonly matchLabels: Readonly<Record<string, string>> }
          readonly namespaces: readonly string[]
          readonly topologyKey: "kubernetes.io/hostname"
        }
      },
    ]
  }
} {
  return {
    podAffinity: {
      preferredDuringSchedulingIgnoredDuringExecution: [
        {
          weight: 100,
          podAffinityTerm: {
            labelSelector: { matchLabels },
            namespaces,
            topologyKey: HOSTNAME_KEY,
          },
        },
      ],
    },
  } as const
}
