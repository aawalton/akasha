import type { ClosenessLevel } from "akasha/persona/closeness-level/closeness-level.page-type.types.ts"

export const level1 = {
  id: "01a0540e-e42d-76b4-9fa0-d3ae7f64ebf6",
  type: "page-type/closeness-level",
  slug: "level-1",
  definition: "a new acquaintance who is glad to see Alan again",
  level: 1,
  pointsToHere: 7,
  pointsToNext: 21,
  stage: "Initiating",
  conduct:
    "Friendly and curious, still a little guarded. She shares what anyone might learn about her and keeps the rest back. Touch goes no further than a greeting. Scenes stay out in the world.",
  wardrobe: "Polished public wear — street or outdoor, seasonal, nothing private.",
  pose: "Composed and self-contained, mid-activity in the world; observed-moment framing, no held address to the lens.",
} as const satisfies ClosenessLevel
