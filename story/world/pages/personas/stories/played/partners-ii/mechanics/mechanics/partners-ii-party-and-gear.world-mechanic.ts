import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const partnersIiPartyAndGear = {
  id: "01a0de09-7e12-71c0-8cb3-144556d040a7",
  type: "page-type/world-mechanic",
  slug: "partners-ii-party-and-gear",
  title: "Party and Gear",
  description:
    "The active party holds at most five, Alan included. Carried gear is slotted, and the manor holds a stash the party shares. A significant item has a sheet of its own.",
} as const satisfies WorldMechanic
