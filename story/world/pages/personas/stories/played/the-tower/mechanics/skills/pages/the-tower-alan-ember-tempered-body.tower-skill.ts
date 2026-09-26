import type { TowerSkill } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/tower-skill.page-type.types.ts"

export const theTowerAlanEmberTemperedBody = {
  id: "01a0de1d-8eba-793b-8576-302209087b7f",
  type: "page-type/tower-skill",
  slug: "the-tower-alan-ember-tempered-body",
  title: "Ember-Tempered Body",
  character: "character-player/the-tower-alan",
  rank: "tower-skill-rank/the-tower-apprentice",
  level: 1,
  demonstrations: 0,
  axis: "Physical resilience.",
  element: "tower-element/the-tower-ember",
} as const satisfies TowerSkill
