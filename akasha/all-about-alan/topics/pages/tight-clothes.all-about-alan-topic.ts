import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const tightClothes = {
  id: "01a06559-9d65-722c-9678-d128de1034ed",
  pageTypeSlug: "all-about-alan-topic",
  slug: "tight-clothes",
  title: "Tight Clothes",
  definition: "tight everything, so I know where my body is and stop noticing fabric",
  parentSlugs: ["what-my-senses-cost-me"],
  settled:
    "Tight is the default day and night, and on a low day I swap the outer layers to loose.\n\nIt never stops working, though I stop noticing it.",
  unsettled:
    "What counts as tight enough, and what counts as too tight even by default, has no boundary.\n\nFabric stretches with wear, and when a garment stops holding the floor is unnamed.\n\nTen to twenty-five percent of my load is a wide range, and no controlled comparison has narrowed it.",
} as const satisfies AllAboutAlanTopic
