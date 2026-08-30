import type { ClosenessLevel } from "../closeness-level.page-type.ts"

export const level1 = {
  id: "01a0540e-e42d-76b4-9fa0-d3ae7f64ebf6",
  pageTypeSlug: "closeness-level",
  slug: "level-1",
  definition: "Public-facing: out in the world, composed, observed framing.",
  level: 1,
  stage: "Initiating",
  wardrobe: "Polished public wear — street or outdoor, seasonal, nothing private.",
  pose: "Composed and self-contained, mid-activity in the world; observed-moment framing, no held address to the lens.",
} as const satisfies ClosenessLevel
