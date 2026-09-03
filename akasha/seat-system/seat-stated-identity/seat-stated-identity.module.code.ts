import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { callSeatAt, type SeatCall, seatCallIn } from "@akasha/seat-system/supervisor-seat-defaults"
import { SEAT_COMMAND_REL } from "@akasha/seat-system/terminal-seat-stating"
import { ASSIGNMENTS, ATTRIBUTES } from "@tools/lib/attributes"

export interface StatedIdentity {
  readonly persona?: string
  readonly domain?: string
  readonly role?: string
}

/** The call that checks what was stated, or null where nothing was stated to check. */
export function resolveCall(stated: StatedIdentity): SeatCall | null {
  const held = stated as Readonly<Record<string, unknown>>
  const slots: Record<string, string> = {}
  for (const key of [...ATTRIBUTES, ...ASSIGNMENTS]) {
    const slug = held[key]
    if (typeof slug === "string") slots[key] = slug
  }
  if (Object.keys(slots).length === 0) return null
  return { ...slots, resolve: true }
}

/** The refusal a stated identity earns, or null where it checks out or states nothing. */
export async function resolveStatedIdentity(stated: StatedIdentity): Promise<string | null> {
  const call = resolveCall(stated)
  if (call === null) return null
  const entry = seatCallIn(rootFor(resolveRoots(), AKASHA))
  if (entry === null) {
    return (
      `an identity was stated, and ${SEAT_COMMAND_REL} is what checks a slug against ` +
      "the pages. It is not there, so the seat would boot holding none of what was named."
    )
  }
  const outcome = await callSeatAt(entry, call)
  if (outcome.code === 0) return null
  const said = outcome.stderr.trim()
  return said === "" ? `${entry} refused the stated identity` : said
}
