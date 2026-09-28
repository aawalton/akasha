import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveSkill = {
  id: "01a0e9f0-3dfb-7c73-954a-0ed1bb550364",
  type: "page-type/world-mechanic",
  slug: "super-supportive-skill",
  title: "Skill",
  world: "world/super-supportive",
  aliases: ["talent", "first skills", "starter skill"],
  description:
    "A talent bound into an Avowed, usually built to rapidly reproduce a difficult but desirable spell.",
} as const satisfies WorldMechanic
