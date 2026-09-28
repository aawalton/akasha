import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const superSupportiveTheMakerOfNarrowWays = {
  id: "01a0e9f6-d518-7d20-a223-7888774bb045",
  type: "page-type/world-skill",
  slug: "super-supportive-the-maker-of-narrow-ways",
  title: "The Maker of Narrow Ways",
  world: "world/super-supportive",
  aliases: ["Maker of Narrow Ways"],
  description:
    "A knight skill that forms a way from one point to another, denying everything else that space.",
} as const satisfies WorldSkill
