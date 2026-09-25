import type { Sampler } from "akasha/alan/harness/alan-readout/modules/workstation-load-sampling/workstation-load-sampling.module.code.ts"
import { firstCapture } from "akasha/code/type/narrowing/modules/first-capture/first-capture.module.code.ts"

const MEM_AVAILABLE = "MemAvailable"

const KB_A_GB = 1024 * 1024

const TENTHS = 10

function kilobytesOf(meminfo: string, name: string): number | null {
  const said = firstCapture(new RegExp(`^${name}:\\s+(\\d+)\\s+kB`, "m").exec(meminfo))
  if (said === null) return null
  const read = Number.parseInt(said, 10)
  return Number.isFinite(read) ? read : null
}

export function memoryIn(meminfo: string): number | null {
  const available = kilobytesOf(meminfo, MEM_AVAILABLE)
  if (available === null) return null
  return Math.round((available / KB_A_GB) * TENTHS) / TENTHS
}

export function sampler(): Sampler {
  return (kernel) => memoryIn(kernel.meminfo())
}
