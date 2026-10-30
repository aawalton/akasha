import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const giftedTrialWorldPathOfExceptionalism = {
  id: "01a18d10-93f1-7a65-884f-78e0d14e7227",
  type: "page-type/world-skill",
  slug: "gifted-trial-world-path-of-exceptionalism",
  title: "Path of Exceptionalism",
  world: "world/gifted-trial-world",
  abilityKind: "world-ability-kind/gifted-trial-world-path",
  tierSteps: [10, 100, 500],
  description: "An Elite Path walked by doing what is exceptional.",
  createdAt: "2026-10-30T13:47:19.494Z",
  updatedAt: "2026-10-30T13:47:19.494Z",
} as const satisfies WorldSkill
