export const HOSTNAME_KEY = "kubernetes.io/hostname" as const

export type WorkloadClass =
  | "control"
  | "database"
  | "build"
  | "serve"
  | "workers"
  | "ci"
  | "eso-rig"

const WORKLOAD_CLASS_KEY = "alanwalton.com/workload-class" as const

export function capabilitySelector(workloadClass: WorkloadClass): {
  readonly "alanwalton.com/workload-class": WorkloadClass
} {
  return { [WORKLOAD_CLASS_KEY]: workloadClass } as const
}

const WORKLOAD_CLASS_MEMBER_PREFIX = "alanwalton.com/workload-class." as const

function workloadClassMemberKey<C extends WorkloadClass>(
  workloadClass: C
): `alanwalton.com/workload-class.${C}` {
  return `${WORKLOAD_CLASS_MEMBER_PREFIX}${workloadClass}`
}

export function workloadClassMemberSelector(
  workloadClass: WorkloadClass
): Readonly<Record<string, "true">> {
  return { [workloadClassMemberKey(workloadClass)]: "true" }
}

const GPU_VRAM_USABLE_MIB_KEY = "alanwalton.com/gpu-vram-usable-mib" as const

const GPU_COMPUTE_CAP_KEY = "alanwalton.com/gpu-compute-cap" as const

const GPU_VRAM_USABLE_MIN_PREFIX = "alanwalton.com/gpu-vram-usable-min." as const

export type GpuVramTier = "8gi"

const GPU_VRAM_TIER_MIN_MIB: Readonly<Record<GpuVramTier, number>> = { "8gi": 8 * 1024 }

const GPU_VRAM_TIERS: readonly GpuVramTier[] = ["8gi"] as const

function gpuVramUsableMinKey<T extends GpuVramTier>(
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
