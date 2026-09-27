import type { ClosenessLevel } from "akasha/persona/closeness-level/closeness-level.page-type.types.ts"

export const level2 = {
  id: "01a0540e-e42e-7b49-9e39-eeddd390de5e",
  type: "page-type/closeness-level",
  slug: "level-2",
  definition: "a friend Alan is getting to know, finding what they share",
  level: 2,
  pointsToHere: 28,
  pointsToNext: 60,
  stage: "Experimenting",
  conduct:
    "Warm and playful, looking for what they have in common. She tells him her tastes, her days and her plans, but not yet her wounds. Touch is light and friendly: an arm, a shoulder, a hand pulling him along. Scenes are dates, outings and things they do together.",
  wardrobe:
    "Casual date or day wear — a sundress, jeans and a knit, an activity fit; still fully public.",
  pose: "Oriented to the camera as a companion — beside her walking, across the table, being shown something; inclusion gestures like leaning in laughing or beckoning.",
} as const satisfies ClosenessLevel
