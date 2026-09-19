import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const createLuckyCharmMemorabilia = {
  id: "01a06575-97ff-7546-98ee-25454ce0d9a3",
  type: "page-type/world-skill",
  slug: "create-lucky-charm-memorabilia",
  title: "Create Lucky Charm (Memorabilia)",
  world: "world/the-wandering-inn",
} as const satisfies WorldSkill
