import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const theDungeonOfOneThousandDeathsLedger = {
  id: "01a10333-e2a9-7309-a415-29e8116db599",
  type: "page-type/world-mechanic",
  slug: "the-dungeon-of-one-thousand-deaths-ledger",
  title: "The Ledger",
  world: "world/the-dungeon-of-one-thousand-deaths",
  description:
    "The System laid over the Maw: a cold, precise voice in monospace blocks, like a coroner's report. It gives each entrant a Designation, a Gift and the Gift's Cost, and four stats: Vitality, the health pool, at 0 of which the entrant dies; Resolve, the mind's fortitude against fear and madness; Attunement, the connection to the Maw that scales the Gift; and Fortune, luck in loot, encounters, traps and paths. Stats start between 1 and 50 and are softly capped at 100, with no levels and no experience. They grow by consuming Memory Crystals, surviving a Depth transition, killing a Named Monster, finding an unbloodied room and using the Gift. Where an entrant dies the Ledger writes a death report and counts the death toward a thousand.",
} as const satisfies WorldMechanic
