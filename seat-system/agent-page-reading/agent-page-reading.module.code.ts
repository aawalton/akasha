import { everyOfType } from "@akasha/indexes"
import { type Value, valueAt } from "@akasha/pages-system/page-value"
import { akashaSeatPathForAgent } from "../seat-akasha-beside/seat-akasha-beside.module.code.ts"

const SUBAGENT = "subagent"

const ID = "id"

const PRINCIPAL_SEAT_NAME = "principalSeatName"

const AGENT_ID = "agentId"

const SUBAGENT_MARK = "--"

function declaredAt(at: string, root: string): Value | null {
  return valueAt(at, root)
}

function textIn(value: Value, key: string): string | null {
  const held = value[key]
  return typeof held === "string" && held !== "" ? held : null
}

export function seatPageAt(agentId: string, root: string): string | null {
  const at = akashaSeatPathForAgent(agentId)
  if (at === null) return null
  const held = declaredAt(at, root)
  return held !== null && textIn(held, ID) === agentId ? at : null
}

export interface SubagentPage {
  readonly seat: string
  readonly own: string
  readonly at: string
}

export function subagentPagesStanding(root: string): readonly SubagentPage[] {
  const found: SubagentPage[] = []
  for (const listed of everyOfType(root, SUBAGENT)) {
    const held = declaredAt(listed.path, root)
    if (held === null) continue
    const seat = textIn(held, PRINCIPAL_SEAT_NAME)
    const agentId = textIn(held, AGENT_ID)
    if (seat === null || agentId === null) continue
    const parts = agentId.indexOf(SUBAGENT_MARK)
    if (parts <= 0) continue
    const own = agentId.slice(parts + SUBAGENT_MARK.length)
    if (own === "") continue
    found.push({ seat, own, at: listed.path })
  }
  return found
}
