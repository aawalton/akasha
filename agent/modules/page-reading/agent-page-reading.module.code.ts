import { akashaSeatPathForAgent } from "akasha/agent/seat/modules/akasha-beside/seat-akasha-beside.module.code.ts"
import { everyOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { uncommittedIn } from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import {
  slugOf,
  textIn,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

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
    const named = textIn(held, PRINCIPAL_SEAT_NAME)
    const agentId = textIn(held, AGENT_ID)
    if (named === null || agentId === null) continue
    const seat = slugOf(named)
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
