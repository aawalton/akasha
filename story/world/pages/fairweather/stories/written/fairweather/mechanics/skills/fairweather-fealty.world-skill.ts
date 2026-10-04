import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fairweatherFealty = {
  id: "01a106e8-584a-7105-83d3-a729cc591f8c",
  type: "page-type/world-skill",
  slug: "fairweather-fealty",
  title: "Fealty",
  world: "world/fairweather",
  description:
    "A passive Enthraller skill, gained at level 7: each devotion answers the others. Every bond's share, for Devotion and so for Tribute, is the bond's number up to 100, plus 10 points for each other bond Elsie holds at 50 or more, and with Fealty a share may pass 100%. So a bond of 100, with four other bonds at 50 or more, has a share of 140%, and Tribute half that, 70%.",
} as const satisfies WorldSkill
