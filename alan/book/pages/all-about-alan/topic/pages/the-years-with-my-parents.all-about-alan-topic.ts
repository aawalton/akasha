import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theYearsWithMyParents = {
  id: "01a06559-9d65-7672-88c8-b2eb82240145",
  type: "page-type/all-about-alan-topic",
  slug: "the-years-with-my-parents",
  title: "The Years With My Parents",
  definition:
    "my father's last years and my mother's, and the whole run of it that is nowhere written down",
  parents: ["all-about-alan-topic/the-chapters-of-my-life"],
  related: [
    "all-about-alan-topic/what-the-book-of-me-is-for",
    "all-about-alan-topic/why-getting-close-hurts",
    "all-about-alan-topic/blank-check-mode-and-recovery-mode",
  ],
  settled:
    "My parents explicitly called their parenting philosophy benevolent neglect. It took me thirty-eight years to realize that is a kind of neglect.\n\nThe word benevolent did the hiding. It kept the experience out of the category it belonged to for decades, until I saw that the one is a kind of the other.\n\nThey were good parents. They were neurodiverse themselves and did not know it, and they struggled, so I could not rely on them.\n\nI was making my own meals at three.\n\nIt has come into view in layers, one face at a time: cared for, then neglected at thirty-eight, then abused this year.\n\nWhen my first A- had me on the floor they started repeating that grades are not important and they do not care about my grades. It was put to me that the line has the same shape as the benevolent neglect. I had not considered that, and there does seem to be some resonance.",
} as const satisfies AllAboutAlanTopic
