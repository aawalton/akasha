import type { TowerSkill } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/tower-skill.page-type.types.ts"

export const theTowerAlanEmberBurst = {
  id: "01a0de1d-8eba-7e4c-a936-9957a2a3c9d5",
  type: "page-type/tower-skill",
  slug: "the-tower-alan-ember-burst",
  title: "Ember Burst",
  character: "character-player/the-tower-alan",
  rank: "tower-skill-rank/the-tower-journeyman",
  level: 8,
  demonstrations: 0,
  axis: "Aim, metering, and where the pulse is placed.",
  element: "tower-element/the-tower-ember",
} as const satisfies TowerSkill
