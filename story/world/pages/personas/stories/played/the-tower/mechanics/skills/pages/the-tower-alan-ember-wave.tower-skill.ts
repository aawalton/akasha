import type { TowerSkill } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/tower-skill.page-type.types.ts"

export const theTowerAlanEmberWave = {
  id: "01a0de1d-8eba-7509-865e-282e8b66f6b4",
  type: "page-type/tower-skill",
  slug: "the-tower-alan-ember-wave",
  title: "Ember Wave",
  character: "character-player/the-tower-alan",
  rank: "tower-skill-rank/the-tower-novice",
  level: 3,
  demonstrations: 0,
  axis: "The form of the flame: a wave, then a directed gout, then a fireball at higher control.",
  element: "tower-element/the-tower-ember",
} as const satisfies TowerSkill
