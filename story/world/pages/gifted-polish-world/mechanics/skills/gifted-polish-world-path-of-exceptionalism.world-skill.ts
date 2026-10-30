import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const giftedPolishWorldPathOfExceptionalism = {
  id: "01a18e17-127d-7ee0-a40b-023ae70ad6e0",
  type: "page-type/world-skill",
  slug: "gifted-polish-world-path-of-exceptionalism",
  title: "Path of Exceptionalism",
  world: "world/gifted-polish-world",
  abilityKind: "world-ability-kind/gifted-polish-world-path",
  tierSteps: [10, 100, 500],
  description: "An Elite Path walked by doing what is exceptional.",
  createdAt: "2026-10-30T18:34:02.178Z",
  updatedAt: "2026-10-30T18:34:02.178Z",
} as const satisfies WorldSkill
