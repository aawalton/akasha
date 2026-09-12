import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const MOUNT = "/sys/fs/cgroup"

const OWN = "/proc/self/cgroup"

const PROCS = "cgroup.procs"

const CONTROL = "cgroup.subtree_control"

const SCOPE = "tmux-spawn-"

const AGENT = "agent"

const CPU = "cpu"

const TURN_ON = "+cpu +memory"

export function groupIn(text: string): string | null {
  const own = text.trim().split("\n")[0]?.split(":").at(-1)
  return own === undefined || own === "" ? null : own
}

export function isSeatScope(own: string): boolean {
  return (own.split("/").at(-1) ?? "").startsWith(SCOPE)
}

export function seatScopeIn(text: string): string | null {
  const own = groupIn(text)
  return own === null || !isSeatScope(own) ? null : join(MOUNT, own)
}

export function turnedOn(at: string): boolean {
  return readFileSync(join(at, CONTROL), "utf8")
    .split(/\s+/)
    .some((one) => one.replace("+", "") === CPU)
}

export function heldIn(at: string): readonly string[] {
  return readFileSync(join(at, PROCS), "utf8")
    .split("\n")
    .filter((one) => one !== "")
}

export function opened(at: string): boolean {
  if (turnedOn(at)) return true
  const held = heldIn(at)
  mkdirSync(join(at, AGENT), { recursive: true })
  for (const one of held) {
    try {
      writeFileSync(join(at, AGENT, PROCS), one)
    } catch {}
  }
  writeFileSync(join(at, CONTROL), TURN_ON)
  return turnedOn(at)
}

export function openSeatGroup(): boolean {
  try {
    const at = seatScopeIn(readFileSync(OWN, "utf8"))
    return at === null ? false : opened(at)
  } catch {
    return false
  }
}
