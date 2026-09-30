import type { OverwhereIiTalent } from "akasha/story/world/pages/sovereign-sight-progression-fantasy-cultivation/stories/played/overwhere-ii/mechanics/talents/overwhere-ii-talent.page-type.types.ts"

export const overwhereIiNalaUndertow = {
  id: "01a0ed18-5d79-72b3-b8bb-935f5e320c68",
  type: "page-type/overwhere-ii-talent",
  slug: "overwhere-ii-nala-undertow",
  title: "Undertow",
  description:
    "A tide in her that pushes and pulls, and draws Water, salt and rot out of what lies in its reach.",
  world: "world/sovereign-sight-progression-fantasy-cultivation",
  character: "character-player/overwhere-ii-nala",
  talent: "world-skill/overwhere-ii-undertow",
  manaCost: 2,
  depth: "Surface",
  reachFeet: 30,
  draw: 40,
  hardWorkings: 10,
  widenings: [
    "Draws from anything in its reach, not only what she touches.",
    "Pushes one thing and pulls another at the same time, at will.",
  ],
} as const satisfies OverwhereIiTalent
