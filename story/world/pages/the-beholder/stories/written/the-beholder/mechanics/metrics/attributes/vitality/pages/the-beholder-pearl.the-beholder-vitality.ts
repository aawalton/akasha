import type { TheBeholderVitality } from "akasha/story/world/pages/the-beholder/stories/written/the-beholder/mechanics/metrics/attributes/vitality/the-beholder-vitality.page-type.types.ts"

export const theBeholderPearl = {
  id: "01a0deec-efb4-77da-b701-35a15513b46b",
  type: "page-type/the-beholder-vitality",
  slug: "the-beholder-pearl",
  character: "character-player/the-beholder-pearl",
  value: 9,
} as const satisfies TheBeholderVitality
