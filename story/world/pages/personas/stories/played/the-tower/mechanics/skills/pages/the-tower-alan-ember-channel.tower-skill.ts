import type { TowerSkill } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/tower-skill.page-type.types.ts"

export const theTowerAlanEmberChannel = {
  id: "01a0de1d-8eba-7f58-a722-a7859fbef57e",
  type: "page-type/tower-skill",
  slug: "the-tower-alan-ember-channel",
  title: "Ember Channel",
  character: "character-player/the-tower-alan",
  skill: "world-skill/the-tower-ember-channel",
  rank: "tower-skill-rank/the-tower-apprentice",
  level: 9,
  demonstrations: 0,
  element: "tower-element/the-tower-ember",
} as const satisfies TowerSkill
