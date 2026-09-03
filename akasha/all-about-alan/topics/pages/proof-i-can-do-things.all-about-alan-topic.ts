import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const proofICanDoThings = {
  id: "01a06559-9d65-7ee4-9c61-4d87edae576b",
  pageTypeSlug: "all-about-alan-topic",
  slug: "proof-i-can-do-things",
  title: "Proof I Can Do Things",
  definition: "the safety I get from evidence that I am capable",
  parentSlugs: ["safety-bar"],
  settled:
    "It comes from pointing at something I actually did, never from feeling better about it.",
  unsettled:
    "Finishing a project is the anchored case. Whether physical accomplishment, social effectiveness or control over my surroundings runs through the same verification is open.",
} as const satisfies AllAboutAlanTopic
