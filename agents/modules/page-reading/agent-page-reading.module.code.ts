import { akashaSeatPathForAgent } from "akasha/agents/seats/page/modules/akasha-beside/seat-akasha-beside.module.code.ts"
import { everyOfType } from "akasha/pages/indexes/modules/reading/index-reading.module.code.ts"
import { uncommittedIn } from "akasha/pages/modules/uncommitted/page-uncommitted.module.code.ts"
import { valueAt } from "akasha/pages/modules/value/page-value.module.code.ts"
import {
  textIn,
  type Value,
} from "akasha/pages/modules/value-reading/page-value-reading.module.code.ts"

const SUBAGENT = "subagent"

const ID = "id"

const PRINCIPAL_SEAT_NAME = "principalSeatName"

const AGENT_ID = "agentId"

const DISPATCHED_AS = "dispatchedAs"

const SUBAGENT_MARK = "--"

const STOPPED = "stopped"

function declaredAt(at: string, root: string): Value | null {
  return valueAt(at, root)
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
  readonly dispatchedAs: string | null
  readonly stopped?: boolean
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
    found.push({
      seat,
      own,
      at: listed.path,
      dispatchedAs: textIn(held, DISPATCHED_AS),
      stopped: uncommittedIn(root, listed.path)?.[STOPPED] === true,
    })
  }
  return found
}
