import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const superSupportiveTheEnsnarerOfMinds = {
  id: "01a0e9f6-d518-725f-a615-1b4e533fb2f2",
  type: "page-type/world-skill",
  slug: "super-supportive-the-ensnarer-of-minds",
  title: "The Ensnarer of Minds",
  world: "world/super-supportive",
  description:
    "A knight skill that makes mind snares, shelters for minds that can hide things from attention.",
} as const satisfies WorldSkill
