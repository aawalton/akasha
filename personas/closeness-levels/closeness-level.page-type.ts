import type { Domain } from "@akasha/domains/domain"
import type { PageType } from "@akasha/pages/page-type"
import type { Level } from "./properties/level.number-property.ts"
import type { PointsToHere } from "./properties/points-to-here.number-property.ts"
import type { PointsToNext } from "./properties/points-to-next.number-property.ts"
import type { Pose } from "./properties/pose.text-property.ts"
import type { Stage } from "./properties/stage.text-property.ts"
import type { Wardrobe } from "./properties/wardrobe.text-property.ts"

export type ClosenessLevel = Domain & {
  level: Level
  pointsToHere: PointsToHere
  pointsToNext: PointsToNext
  stage: Stage
  wardrobe: Wardrobe
  pose: Pose
}

export const closenessLevel = {
  id: "01a0540e-5111-7164-acb3-f776b18d8b45",
  pageTypeSlug: "page-type",
  slug: "closeness-level",
  definition: "one rung of how close a persona is drawn, from public to unveiled",
  pluralSlug: "closeness-levels",
  extends: ["page-type/domain"],
  parts: [
    "closeness-level/level-1",
    "closeness-level/level-2",
    "closeness-level/level-3",
    "closeness-level/level-4",
    "closeness-level/level-5",
    "closeness-level/level-6",
    "number-property/level",
    "number-property/points-to-here",
    "number-property/points-to-next",
    "number-property/relationship-level",
    "text-property/pose",
    "text-property/stage",
    "text-property/wardrobe",
  ],
  properties: [
    { pagePropertySlug: "number-property/level", required: true, many: false },
    { pagePropertySlug: "number-property/points-to-here", required: true, many: false },
    { pagePropertySlug: "number-property/points-to-next", required: true, many: false },
    { pagePropertySlug: "text-property/stage", required: true, many: false },
    { pagePropertySlug: "text-property/wardrobe", required: true, many: false },
    { pagePropertySlug: "text-property/pose", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A level is reached by points earned rather than chosen.",
    },
    {
      invariantKind: "departure",
      statement: "The points a rung takes are stated here rather than worked out.",
    },
    {
      invariantKind: "departure",
      statement: "A persona below the first rung is at level 0, and level 0 is no page.",
    },
    {
      invariantKind: "departure",
      statement: "The rungs run from level 1 upward with no level missing between.",
    },
  ],
} as const satisfies PageType
