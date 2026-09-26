import type { TowerSkill } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/tower-skill.page-type.types.ts"

export const theTowerAlanEmberSiphon = {
  id: "01a0de1d-8eba-725a-b549-ba4c36dd2682",
  type: "page-type/tower-skill",
  slug: "the-tower-alan-ember-siphon",
  character: "character-player/the-tower-alan",
  skill: "world-skill/the-tower-ember-siphon",
  rank: "tower-skill-rank/the-tower-apprentice",
  level: 1,
  demonstrations: 0,
  axis: "The form and yield of the draw.",
  element: "tower-element/the-tower-ember",
} as const satisfies TowerSkill
