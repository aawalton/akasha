import { KB_PER_GB } from "akasha/infrastructure/memory/memory-reaping/memory-reaper-legs/memory-reaper-legs.module.code.ts"
import type { PidSnapshot } from "akasha/infrastructure/memory/memory-reaping/memory-reaper-proc-scan/memory-reaper-proc-scan.module.code.ts"

export function snap(pid: number, ppid: number, gb: number): PidSnapshot {
  return { pid, ppid, vmRssKb: gb * KB_PER_GB, pssKb: gb * KB_PER_GB, name: `p${pid}` }
}
