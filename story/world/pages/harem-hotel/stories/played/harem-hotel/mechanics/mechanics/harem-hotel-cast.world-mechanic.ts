import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const haremHotelCast = {
  id: "01a0e823-0b06-70a6-ba85-d2bd1a8e2c39",
  type: "page-type/world-mechanic",
  slug: "harem-hotel-cast",
  title: "Cast",
  world: "world/harem-hotel",
  description:
    "The women of the Harem Hotel are born of the tower: new characters, never personas, and every one an adult. The tower keeps one cast that starts small and grows, a new woman every few floors, and the world builder decides when each new woman joins and who she is. At every new floor the tower deals a new hand: the women Alan has met come back remixed into new roles in the new staging, in new pairings and new dynamics, the attendant of one floor the queen of the next. Each keeps her own name, look and nature under every role, and what Alan has learned of each one carries from floor to floor, as she remembers him. The cast is the roster: each woman has a character-other at `story/world/pages/harem-hotel/stories/played/harem-hotel/characters/harem-hotel-<her name>.character-other.ts`, with `story: \"story-played/harem-hotel\"` and `title` what Alan knows her by, a short description until she gives her name and her name from then on, and a lore page about her at `story/world/pages/harem-hotel/lore/harem-hotel-<her name>.lore.ts` in `world/harem-hotel`. Her lore holds her look and her nature as facts, and one fact for each floor she appeared on, as `Floor <n>: <the role she played there>`. The world builder lands a new woman's character and lore before the turn she first appears in; the memory story recorder tells Alan's character each fact the prose shows him, and adds the floor fact the turn she appears on a floor. The writer names every woman present with `--character`.",
} as const satisfies WorldMechanic
