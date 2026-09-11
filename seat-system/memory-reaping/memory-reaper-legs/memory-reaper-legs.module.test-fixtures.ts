import type { PidSnapshot } from "../memory-reaper-proc-scan/memory-reaper-proc-scan.module.code.ts"
import { KB_PER_GB } from "./memory-reaper-legs.module.code.ts"

export function snap(pid: number, ppid: number, gb: number): PidSnapshot {
  return { pid, ppid, vmRssKb: gb * KB_PER_GB, pssKb: gb * KB_PER_GB, name: `p${pid}` }
}
