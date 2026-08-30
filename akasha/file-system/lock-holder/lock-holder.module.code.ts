import { readFileSync } from "node:fs"

const UNKNOWN = "-"

const STARTED = 19

export type Holder = {
  readonly pid: number
  readonly started: string
}

export function startedAt(pid: number): string {
  try {
    const said = readFileSync(`/proc/${pid}/stat`, "utf8")
    const fields = said
      .slice(said.lastIndexOf(")") + 1)
      .trim()
      .split(/\s+/)
    return fields[STARTED] ?? UNKNOWN
  } catch {
    return UNKNOWN
  }
}

export function markIn(at: string): string | null {
  try {
    const said = readFileSync(at, "utf8").trim()
    return said === "" ? null : said
  } catch {
    return null
  }
}

export function holderOf(mark: string | null): Holder | null {
  if (mark === null) return null
  const [said, started] = mark.split(" ")
  const pid = Number.parseInt(said ?? "", 10)
  if (Number.isNaN(pid) || pid < 1) return null
  return { pid, started: started === undefined || started === "" ? UNKNOWN : started }
}

export function alive(held: Holder): boolean {
  try {
    process.kill(held.pid, 0)
  } catch {
    return false
  }
  const started = startedAt(held.pid)
  return held.started === UNKNOWN || started === UNKNOWN || started === held.started
}
