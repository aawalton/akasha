import { readFileSync } from "node:fs"

export type PidSnapshot = {
  pid: number
  ppid: number
  vmRssKb: number
  pssKb: number
  name: string
}

export function isContainerCgroup(cgroupContent: string): boolean {
  return /libpod-/.test(cgroupContent)
}

export function readContainerPids(snapshots: readonly PidSnapshot[]): readonly number[] {
  const pids: number[] = []
  for (const s of snapshots) {
    let cgroup: string
    try {
      cgroup = readFileSync(`/proc/${s.pid}/cgroup`, "utf8")
    } catch {
      continue
    }
    if (isContainerCgroup(cgroup)) pids.push(s.pid)
  }
  return pids
}
