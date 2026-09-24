import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const deathLoop = {
  id: "01a0d41b-c868-71a6-92a7-1155450af52a",
  type: "page-type/lore",
  slug: "death-loop",
  title: "Death Loop",
  world: "world/personas",
  loreDisclosure: "lore-disclosure/world-builder",
  facts: [
    "Dying returns Alan to the floor-1 entrance, staged as his first arrival was.",
    "Alan keeps every memory across a death.",
    "Alan keeps his level, attributes, skills, titles and affinities across a death.",
    "Alan keeps his health, focus and stamina maximums across a death.",
    "Alan loses his equipment, consumables and everything he carries when he dies.",
    "Companions reset at Alan's death and do not remember him.",
    "Alan remembers his companions after they reset.",
    "The tower regenerates at Alan's death, with its enemies respawned.",
    "The tower's layout shifts at each death, enough that memorising it is not enough.",
    "The upper floors scale, so what Alan keeps is a head start rather than a stroll.",
  ],
} as const satisfies Lore
