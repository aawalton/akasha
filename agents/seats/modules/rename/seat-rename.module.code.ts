import { restateSeatName } from "akasha/agents/seats/modules/name-restate/seat-name-restate.module.code.ts"
import { pageValuesOf } from "akasha/agents/seats/modules/page-values/seat-page-values.module.code.ts"
import { seatNameForAgent } from "akasha/agents/seats/modules/presence-read/seat-presence-read.module.code.ts"
import {
  renameSeatSession,
  sessionNote,
} from "akasha/agents/seats/modules/session-rename/seat-session-rename.module.code.ts"
import { lowerUuid } from "akasha/pages/name-formats/pages/lower-uuid/lower-uuid.name-format.code.ts"
import {
  composeSeatName,
  FLEET,
  type NameableSeat,
} from "akasha/seat-system/compose-seat-name/compose-seat-name.module.code.ts"

const SLOT_JOINER = "|"

function slotsOf(seat: NameableSeat): string {
  return [seat.attributes.persona, seat.attributes.domain, seat.attributes.role, seat.principal]
    .map((one) => one ?? "")
    .join(SLOT_JOINER)
}

export function composedNameOf(agent: string): string | null {
  return seatNameForAgent(agent)
}

const PAGE_SLOTS = ["persona-slug", "domain-slug", "role-slug"] as const

const PERSON_KEY = "person-slug"

function pushedSlotsOf(agent: string): string | null {
  const values = pageValuesOf(agent)
  if (values === null) return null
  const person = values[PERSON_KEY]
  const said = (one: unknown): string => (one === undefined || one === null ? "" : String(one))
  return [
    ...PAGE_SLOTS.map((key) => said(values[key])),
    typeof person === "string" && person !== "" ? person : FLEET,
  ].join(SLOT_JOINER)
}

export type Following =
  | { readonly kind: "unchanged"; readonly name: string | null }
  | { readonly kind: "renamed"; readonly name: string; readonly note: string }
  | { readonly kind: "refused"; readonly reason: string }

export async function followName(
  agent: string,
  root: string,
  next: NameableSeat,
  takeLiveName = false
): Promise<Following> {
  if (!lowerUuid(agent.toLowerCase())) return { kind: "unchanged", name: null }
  const name = composeSeatName(next, root)
  if (name === null) return { kind: "unchanged", name: null }
  const slots = slotsOf(next)
  if (name === composedNameOf(agent) && slots === pushedSlotsOf(agent)) {
    return { kind: "unchanged", name }
  }
  const restated = await restateSeatName({ agentId: agent, name, takeLiveName })
  if (restated.kind === "refused") return { kind: "refused", reason: `refused: ${restated.reason}` }
  if (restated.kind === "left-alone") return { kind: "unchanged", name: null }
  if (restated.kind === "unchanged") return { kind: "unchanged", name }
  const was = restated.held
  const session = renameSeatSession(was, name)
  const answered = `bound ${was ?? "(nameless)"} -> ${name}`
  return { kind: "renamed", name, note: `${answered}${sessionNote(session, was, name)}` }
}
