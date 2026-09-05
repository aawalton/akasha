import { akashaRoot } from "@akasha/pages/checkout-roots"
import {
  ASSIGNMENTS,
  ATTRIBUTES,
  type Declaration,
} from "../seat-attributes/seat-attributes.module.code.ts"
import { resolveAttributes, scan } from "../seat-resolve/seat-resolve.module.code.ts"

export interface StatedIdentity {
  readonly persona?: string
  readonly domain?: string
  readonly role?: string
}

/** The slots a seat named, or null where it named none to check. */
export function resolveCall(stated: StatedIdentity): Partial<Record<Declaration, string>> | null {
  const held = stated as Readonly<Record<string, unknown>>
  const slots: Partial<Record<Declaration, string>> = {}
  for (const key of [...ATTRIBUTES, ...ASSIGNMENTS]) {
    const slug = held[key]
    if (typeof slug === "string") slots[key] = slug
  }
  if (Object.keys(slots).length === 0) return null
  return slots
}

/** The refusal what a seat named earns, or null where it checks out or names nothing. */
export function resolveStatedIdentity(stated: StatedIdentity): Promise<string | null> {
  const slots = resolveCall(stated)
  if (slots === null) return Promise.resolve(null)
  const pages = akashaRoot()
  let resolved: ReturnType<typeof resolveAttributes>
  try {
    resolved = resolveAttributes(slots, [], pages, scan(pages))
  } catch (error) {
    const said = error instanceof Error ? error.message : String(error)
    return Promise.resolve(
      "attributes were named, and checking a slug against the pages is what says whether a " +
        `page holds it. That could not be done (${said}), so the seat would boot holding none ` +
        "of what was named."
    )
  }
  if (!("refusals" in resolved)) return Promise.resolve(null)
  return Promise.resolve(
    ["refused:", ...resolved.refusals.map((one) => `  ${one}`), "nothing was resolved"].join("\n")
  )
}
