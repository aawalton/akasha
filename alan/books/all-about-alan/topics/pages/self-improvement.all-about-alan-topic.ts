import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const selfImprovement = {
  id: "01a06559-9d65-70b6-855c-8cda636daee2",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "self-improvement",
  title: "Self-Improvement",
  definition: "the one thing everything else I believe compresses down into",
  parents: ["alan"],
  settled:
    "It is a verb rather than a position, a heading rather than a place to stand.\n\nMy purpose is improving myself rather than improving my life, which puts it inside what I control.\n\nWhat I know is most of who I am. My sense of myself is my live map, as identity rather than as a tool.",
} as const satisfies AllAboutAlanTopic
