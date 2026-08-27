import { readdirSync, readFileSync } from "node:fs"
import { z } from "zod"
import { isSupervisorCmdline } from "../supervisor-cmdline"

const FIRST_CAPTURE_SCHEMA = z
  .unknown()
  .transform((v) => (Array.isArray(v) && typeof v[1] === "string" ? v[1] : null))

export const KB_PER_GB = 1024 * 1024

export type MemoryKillDecision = {
  kill: boolean
  reason: string
}

export function isContainerCgroup(cgroupContent: string): boolean {
  return /libpod-/.test(cgroupContent)
}

const POSITIVE_OVERRIDE_SCHEMA = z.coerce.number().positive().finite()

export function resolvePositiveEnvOverride(envName: string, fallback: number): number {
  const parsed = POSITIVE_OVERRIDE_SCHEMA.safeParse(process.env[envName])
  return parsed.success ? parsed.data : fallback
}

export type PidSnapshot = {
  pid: number
  ppid: number
  vmRssKb: number
  name: string
}

export function readSupervisorPids(snapshots: readonly PidSnapshot[]): readonly number[] {
  const pids: number[] = []
  for (const s of snapshots) {
    let cmdline: string
    try {
      cmdline = readFileSync(`/proc/${s.pid}/cmdline`, "utf8")
    } catch {
      continue
    }
    if (isSupervisorCmdline(cmdline)) pids.push(s.pid)
  }
  return pids
}

export function readUserPidSnapshots(uid: number): readonly PidSnapshot[] {
  const entries = readdirSync("/proc")
  const snapshots: PidSnapshot[] = []
  for (const entry of entries) {
    if (!/^\d+$/.test(entry)) continue
    const pid = Number.parseInt(entry, 10)
    let status: string
    try {
      status = readFileSync(`/proc/${pid}/status`, "utf8")
    } catch {
      continue
    }
    const uidCaptured = FIRST_CAPTURE_SCHEMA.parse(status.match(/^Uid:\s+(\d+)/m))
    if (uidCaptured === null) continue
    if (Number.parseInt(uidCaptured, 10) !== uid) continue
    const ppidCaptured = FIRST_CAPTURE_SCHEMA.parse(status.match(/^PPid:\s+(\d+)/m))
    if (ppidCaptured === null) continue
    const ppid = Number.parseInt(ppidCaptured, 10)
    const rssCaptured = FIRST_CAPTURE_SCHEMA.parse(status.match(/^VmRSS:\s+(\d+)\s+kB/m))
    const vmRssKb = rssCaptured === null ? 0 : Number.parseInt(rssCaptured, 10)
    let name = "unknown"
    try {
      name = readFileSync(`/proc/${pid}/comm`, "utf8").trimEnd()
    } catch {}
    snapshots.push({ pid, ppid, vmRssKb, name })
  }
  return snapshots
}
