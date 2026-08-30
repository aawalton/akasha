import type { Domain } from "../../domain-system/domain/domain.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"
import type { Level } from "./properties/level.number-property.ts"
import type { Pose } from "./properties/pose.text-property.ts"
import type { Stage } from "./properties/stage.text-property.ts"
import type { Wardrobe } from "./properties/wardrobe.text-property.ts"

export type ClosenessLevel = Domain & {
  level: Level
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
  extendsSlug: "page-type/domain",
  partSlugs: [
    "closeness-level/level-1",
    "closeness-level/level-2",
    "closeness-level/level-3",
    "closeness-level/level-4",
    "closeness-level/level-5",
    "closeness-level/level-6",
    "number-property/level",
    "text-property/pose",
    "text-property/stage",
    "text-property/wardrobe",
  ],
  properties: [
    { pagePropertySlug: "level", required: true, many: false },
    { pagePropertySlug: "stage", required: true, many: false },
    { pagePropertySlug: "wardrobe", required: true, many: false },
    { pagePropertySlug: "pose", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A level is reached by points earned rather than chosen.",
    },
    {
      invariantKind: "departure",
      statement: "The last two levels share a stage, so a stage does not name a level.",
    },
  ],
} as const satisfies PageType
