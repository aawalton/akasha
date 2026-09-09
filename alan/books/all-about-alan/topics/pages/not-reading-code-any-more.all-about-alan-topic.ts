import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const notReadingCodeAnyMore = {
  id: "01a04615-3061-7648-a7ec-05832d77b1f6",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "not-reading-code-any-more",
  title: "Not Reading Code Any More",
  definition: "what I read now that I do not read code",
  parents: ["being-an-inventor-not-a-coder"],
  related: ["when-my-docs-are-my-code"],
  settled:
    "I do not think I have read code at all in 2026.\n\nI read docs, because that is where human intervention is most necessary, especially with the domain system.",
} as const satisfies AllAboutAlanTopic
