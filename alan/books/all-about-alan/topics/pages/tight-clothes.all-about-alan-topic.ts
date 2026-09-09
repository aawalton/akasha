import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.types.ts"

export const tightClothes = {
  id: "01a06559-9d65-722c-9678-d128de1034ed",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "tight-clothes",
  title: "Tight Clothes",
  definition: "tight everything, so I know where my body is and stop noticing fabric",
  parents: ["what-my-senses-cost-me"],
  settled:
    "Tight is the default day and night, and on a low day I swap the outer layers to loose.\n\nIt never stops working, though I stop noticing it.",
} as const satisfies AllAboutAlanTopic
