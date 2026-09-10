import { readFile } from "node:fs/promises"

interface WindowIdentity {
  readonly pid: number
  readonly startedAt: number
}

function parseProcessStart(stat: string): number | undefined {
  const afterComm = stat.lastIndexOf(")")
  if (afterComm === -1) {
    return undefined
  }
  const fields = stat
    .slice(afterComm + 1)
    .trim()
    .split(/\s+/)
  const raw = fields[19]
  if (raw === undefined) {
    return undefined
  }
  const parsed = Number(raw)
  return Number.isFinite(parsed) ? parsed : undefined
}

async function readProcessStart(pid: number): Promise<number | undefined> {
  try {
    return parseProcessStart(await readFile(`/proc/${pid}/stat`, "utf8"))
  } catch {
    return undefined
  }
}

async function readWindowIdentity(pid: number): Promise<WindowIdentity> {
  return { pid, startedAt: (await readProcessStart(pid)) ?? 0 }
}

export async function readProcess(pid: number): Promise<string> {
  const identity = await readWindowIdentity(pid)
  return `${identity.pid}-${identity.startedAt}`
}
