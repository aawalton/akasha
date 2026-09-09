import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const theFiveRulesIGrewUpWith = {
  id: "01a06559-9d65-7214-939e-ead0fab77366",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "the-five-rules-i-grew-up-with",
  title: "The Five Rules I Grew Up With",
  definition:
    "the five rules I learned as a child that still fire, long after I stopped believing them",
  parents: ["which-lever-reaches-a-response"],
  related: ["why-i-have-to-be-perfect", "rules-instead-of-a-brake"],
  settled:
    "Always be nice, always be quiet, do not take up space, do not ask for anything, take care of yourself.\n\nThey run from below thought, so winning the argument against them did not stop them.",
} as const satisfies AllAboutAlanTopic
