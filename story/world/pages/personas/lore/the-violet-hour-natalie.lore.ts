import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theVioletHourNatalie = {
  id: "01a0de41-a7a7-75e6-9cc2-3816c1f5dd7c",
  type: "page-type/lore",
  slug: "the-violet-hour-natalie",
  title: "Natalie",
  world: "world/personas",
  about: "character-other/the-violet-hour-natalie",
  loreDisclosure: "lore-disclosure/player",
  facts: [
    "Natalie, Amy and Zadi share a supper once a month, and take turns hosting it.",
    "Natalie hosted the first of those suppers, with Amy and Zadi as her guests.",
  ],
} as const satisfies Lore
