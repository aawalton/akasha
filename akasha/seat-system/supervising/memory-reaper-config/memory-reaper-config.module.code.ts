import {
  GLOBAL_MIN_AVAIL_GB,
  GLOBAL_MIN_FREE_SWAP_GB,
  GLOBAL_RECOVERY_WINDOW_SEC,
} from "../memory-reaper-global/memory-reaper-global.module.code.ts"
import {
  MAX_RSS_GB,
  MAX_TREE_PSS_GB,
} from "../memory-reaper-legs/memory-reaper-legs.module.code.ts"
import { resolvePositiveEnvOverride } from "../memory-reaper-read/memory-reaper-read.module.code.ts"

export const LOG = "memory-reaper:"

export const TICK_MS = 10 * 1000
const KB_PER_GB = 1024 * 1024

const MAX_RSS_GB_EFFECTIVE = resolvePositiveEnvOverride("AGENT_MEM_MAX_RSS_GB", MAX_RSS_GB)
const MAX_TREE_PSS_GB_EFFECTIVE = resolvePositiveEnvOverride(
  "AGENT_MEM_MAX_TREE_PSS_GB",
  MAX_TREE_PSS_GB
)
const GLOBAL_MIN_AVAIL_GB_EFFECTIVE = resolvePositiveEnvOverride(
  "AGENT_MEM_GLOBAL_MIN_AVAIL_GB",
  GLOBAL_MIN_AVAIL_GB
)
const GLOBAL_MIN_FREE_SWAP_GB_EFFECTIVE = resolvePositiveEnvOverride(
  "AGENT_MEM_GLOBAL_MIN_FREE_SWAP_GB",
  GLOBAL_MIN_FREE_SWAP_GB
)
const RECOVERY_WINDOW_SEC_EFFECTIVE = resolvePositiveEnvOverride(
  "AGENT_MEM_GLOBAL_RECOVERY_WINDOW_SEC",
  GLOBAL_RECOVERY_WINDOW_SEC
)

export const THRESHOLD_KB = MAX_RSS_GB_EFFECTIVE * KB_PER_GB
export const TREE_THRESHOLD_KB = MAX_TREE_PSS_GB_EFFECTIVE * KB_PER_GB
export const GLOBAL_MIN_AVAIL_KB = GLOBAL_MIN_AVAIL_GB_EFFECTIVE * KB_PER_GB
export const GLOBAL_MIN_FREE_SWAP_KB = GLOBAL_MIN_FREE_SWAP_GB_EFFECTIVE * KB_PER_GB
export const RECOVERY_WINDOW_MS = RECOVERY_WINDOW_SEC_EFFECTIVE * 1000

export function reaperConfigBanner(): string {
  return (
    `${LOG} ceilings per-process=${MAX_RSS_GB_EFFECTIVE} GiB VmRSS ` +
    `per-tree=${MAX_TREE_PSS_GB_EFFECTIVE} GiB PSS ` +
    `headroom-leg=MemAvail<=${GLOBAL_MIN_AVAIL_GB_EFFECTIVE} GiB when SwapFree<=${GLOBAL_MIN_FREE_SWAP_GB_EFFECTIVE} GiB ` +
    `global-recovery-window=${RECOVERY_WINDOW_SEC_EFFECTIVE}s tick=${TICK_MS / 1000}s ` +
    `(rootless-podman containers excluded)`
  )
}
