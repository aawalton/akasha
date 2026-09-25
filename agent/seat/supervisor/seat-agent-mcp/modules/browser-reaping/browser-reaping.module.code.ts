import { readdirSync, readFileSync } from "node:fs"
import { signalPid } from "akasha/agent/seat/supervisor/modules/supervisor-exec/supervisor-exec.module.code.ts"
import type { HeartbeatPoll } from "akasha/agent/seat/supervisor/supervisor-timer/modules/supervisor-heartbeat/supervisor-heartbeat.module.code.ts"

const MARKERS = ["playwright-mcp", "@playwright/mcp"]
const WRAPPER = "npm exec"
const IDLE_MS = 600_000
const POLL_NAME = "browser-reaping"

type Watch = { readonly jiffies: number; readonly since: number }

export function servesABrowser(cmdline: string): boolean {
  return MARKERS.some((one) => cmdline.includes(one)) && !cmdline.includes(WRAPPER)
}

export function nextWatch(prev: Watch | undefined, jiffies: number, now: number): Watch {
  if (prev === undefined || jiffies !== prev.jiffies) return { jiffies, since: now }
  return prev
}

export function untouchedFor(watch: Watch, now: number): number {
  return now - watch.since
}

export function jiffiesIn(stat: string): number | null {
  const named = stat.lastIndexOf(")")
  if (named < 0) return null
  const fields = stat
    .slice(named + 1)
    .trim()
    .split(" ")
  const user = Number(fields[11])
  const system = Number(fields[12])
  if (!Number.isFinite(user) || !Number.isFinite(system)) return null
  return user + system
}

function jiffiesOf(pid: number): number | null {
  try {
    return jiffiesIn(readFileSync(`/proc/${pid}/stat`, "utf8"))
  } catch {
    return null
  }
}

function childPidsOf(pid: number): readonly number[] {
  try {
    const at = `/proc/${pid}/task`
    const found = new Set<number>()
    for (const tid of readdirSync(at)) {
      const said = readFileSync(`${at}/${tid}/children`, "utf8").trim()
      for (const one of said.split(/\s+/)) if (one !== "") found.add(Number(one))
    }
    return [...found]
  } catch {
    return []
  }
}

function cmdlineOf(pid: number): string {
  try {
    return readFileSync(`/proc/${pid}/cmdline`, "utf8").replaceAll("\0", " ").trim()
  } catch {
    return ""
  }
}

export function browserServersUnder(claudePid: number): readonly number[] {
  const found: number[] = []
  const seen = new Set<number>()
  const left: number[] = [...childPidsOf(claudePid)]
  while (left.length > 0) {
    const pid = left.pop()
    if (pid === undefined) break
    if (seen.has(pid)) continue
    seen.add(pid)
    if (servesABrowser(cmdlineOf(pid))) {
      found.push(pid)
      continue
    }
    left.push(...childPidsOf(pid))
  }
  return found
}

export function browserReapPoll(args: {
  getClaudePid: () => number | null
  log: (line: string) => void
  now?: () => number
  findServers?: (claudePid: number) => readonly number[]
  findBrowsers?: (serverPid: number) => readonly number[]
  readJiffies?: (pid: number) => number | null
  kill?: (pid: number) => void
}): HeartbeatPoll {
  const nowMs = args.now ?? Date.now
  const findServers = args.findServers ?? browserServersUnder
  const findBrowsers = args.findBrowsers ?? childPidsOf
  const readJiffies = args.readJiffies ?? jiffiesOf
  const killPid = args.kill ?? ((pid: number) => signalPid(pid, "SIGKILL"))
  const watching = new Map<number, Watch>()
  let tickInFlight = false

  const beat = (): undefined => {
    if (tickInFlight) return
    tickInFlight = true
    try {
      const claudePid = args.getClaudePid()
      if (claudePid === null) {
        watching.clear()
        return
      }
      const now = nowMs()
      const servers = findServers(claudePid)
      const live = new Set(servers)
      for (const held of watching.keys()) if (!live.has(held)) watching.delete(held)
      for (const server of servers) {
        const jiffies = readJiffies(server)
        if (jiffies === null) {
          watching.delete(server)
          continue
        }
        const watch = nextWatch(watching.get(server), jiffies, now)
        watching.set(server, watch)
        if (untouchedFor(watch, now) < IDLE_MS) continue
        const browsers = findBrowsers(server)
        if (browsers.length === 0) continue
        for (const pid of browsers) killPid(pid)
        watching.delete(server)
        args.log(`${POLL_NAME}: let go of ${browsers.length} browser processes under ${server}`)
      }
    } finally {
      tickInFlight = false
    }
  }

  return {
    name: POLL_NAME,
    run: () => {
      beat()
      return Promise.resolve()
    },
  }
}
