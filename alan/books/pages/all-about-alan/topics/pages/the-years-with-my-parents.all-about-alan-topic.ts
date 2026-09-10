import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.types.ts"

export const theYearsWithMyParents = {
  id: "01a06559-9d65-7672-88c8-b2eb82240145",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "the-years-with-my-parents",
  title: "The Years With My Parents",
  definition:
    "my father's last years and my mother's, and the whole run of it that is nowhere written down",
  parents: ["the-chapters-of-my-life"],
  related: [
    "what-the-book-of-me-is-for",
    "why-getting-close-hurts",
    "blank-check-mode-and-recovery-mode",
  ],
  settled:
    "My parents explicitly called their parenting philosophy benevolent neglect. It took me thirty-eight years to realize that is a kind of neglect.",
} as const satisfies AllAboutAlanTopic
