import { akashaRoot } from "@akasha/pages-system/checkout-roots"
import { ASSIGNMENTS, ATTRIBUTES } from "../seat-attributes/seat-attributes.module.code.ts"
import { seatWhoami } from "../seat-whoami/seat-whoami.module.code.ts"

const SEAT_CALL_CEILING_MS = 300_000

export interface SeatStatement {
  readonly agentId: string
  readonly mode: string
  readonly principal: string | null
  readonly persona?: string
  readonly domain?: string
  readonly role?: string
  readonly flex?: string | null
  readonly initiative?: string | null
  readonly onCall?: boolean
  readonly parentName?: string | null
  readonly account?: string | null
}

function endGroup(proc: ReturnType<typeof Bun.spawn>): undefined {
  try {
    process.kill(-proc.pid, "SIGKILL")
    return
  } catch {}
  try {
    proc.kill(9)
  } catch {}
}

async function callSeat(payload: Record<string, unknown>, agentId: string): Promise<string | null> {
  let proc: ReturnType<typeof Bun.spawn>
  try {
    proc = Bun.spawn({
      cmd: ["bun", `${akashaRoot()}/seat-system/seat-call/seat-call.module.code.ts`],
      stdin: new TextEncoder().encode(JSON.stringify(payload)),
      stdout: "pipe",
      stderr: "pipe",
      env: process.env,
      detached: true,
    })
  } catch (err) {
    return `the seat command could not be run: ${String(err)}`
  }
  let stopped = false
  const timer = setTimeout(() => {
    stopped = true
    endGroup(proc)
  }, SEAT_CALL_CEILING_MS)
  try {
    const code = await proc.exited
    if (code === 0) return null
    const said =
      proc.stderr instanceof ReadableStream ? (await new Response(proc.stderr).text()).trim() : ""

    if (stopped) {
      if (seatWhoami(agentId) !== null) return null
      return (
        `the seat command was stopped after ${SEAT_CALL_CEILING_MS / 1000}s and no seat page ` +
        `stands for ${agentId}`
      )
    }
    return said === "" ? `the seat command exited ${code}` : said
  } catch (err) {
    return `the seat command failed: ${String(err)}`
  } finally {
    clearTimeout(timer)
  }
}

function said(value: string | number | null | undefined): string | number | null {
  return value === undefined || value === "" ? null : value
}

export async function stateSpawnedSeat(statement: SeatStatement): Promise<readonly string[]> {
  const payload: Record<string, unknown> = {
    agent: statement.agentId,
    mode: statement.mode,
    principal: statement.principal,
    flex: said(statement.flex),
    initiative: said(statement.initiative),
    ...(statement.onCall === true ? { onCall: true } : {}),
    parentName: said(statement.parentName),
    account: said(statement.account),
  }
  const held: Readonly<Record<string, unknown>> = { ...statement }
  for (const key of [...ATTRIBUTES, ...ASSIGNMENTS]) {
    if (key in payload) continue
    const slug = held[key]
    if (typeof slug !== "string" || slug === "") continue
    payload[key] = slug
  }
  const refused = await callSeat(payload, statement.agentId)
  return refused === null ? [] : [refused]
}
