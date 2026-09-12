import {
  ATTRIBUTES,
  type Declaration,
  type Mode,
} from "akasha/agents/attributes/agent-attributes.module.code.ts"
import type { Args } from "akasha/agents/seats/modules/args/seat-args.module.code.ts"
import {
  modeRefusal,
  principalRefusal,
} from "akasha/agents/seats/modules/args/seat-args.module.code.ts"
import { run } from "akasha/seat-system/seat-running/seat-running.module.code.ts"

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

function said(value: string | null | undefined): string | null {
  return value === undefined || value === "" ? null : value
}

function stating(statement: SeatStatement, mode: Mode): Args {
  const set: { -readonly [K in Declaration]?: string } = {}
  const held: Readonly<Record<string, unknown>> = { ...statement }
  for (const key of ATTRIBUTES) {
    const slug = held[key]
    if (typeof slug !== "string" || slug === "") continue
    set[key] = slug
  }
  return {
    set,
    initiative: said(statement.initiative),
    flex: said(statement.flex),
    tokens: [],
    clear: [],
    mode,
    principal: statement.principal,
    onCall: statement.onCall === true,
    takeLiveName: false,
    resolve: false,
    name: false,
    fromHistory: false,
    asDefault: false,
    agent: statement.agentId,
    parentName: said(statement.parentName),
    registration: said(statement.account),
  }
}

export async function stateSpawnedSeat(statement: SeatStatement): Promise<readonly string[]> {
  const wrongMode = modeRefusal(statement.mode)
  if (wrongMode !== null) return [`error: ${wrongMode}`]
  const wrongPrincipal = statement.principal === null ? null : principalRefusal(statement.principal)
  if (wrongPrincipal !== null) return [`error: ${wrongPrincipal}`]
  const answer = await run(stating(statement, statement.mode as Mode))
  return answer.kind === "refused" ? [answer.said.trim()] : []
}
