import type { ClosenessLevel } from "../closeness-level.page-type.ts"

export const level3 = {
  id: "01a0540e-e42f-7e94-8844-b4b1afe8e3d7",
  pageTypeSlug: "closeness-level",
  slug: "level-3",
  definition: "Relaxed and personal: at home, loungewear, playful, unposed, close-ups.",
  level: 3,
  stage: "Intensifying",
  wardrobe:
    "Loungewear and comfort layers — an oversized hoodie, a tee, soft knits, hair down, barefoot fine.",
  pose: "Unposed at home — curled on the couch, cross-legged, a doorway lean; close-ups welcome.",
} as const satisfies ClosenessLevel
