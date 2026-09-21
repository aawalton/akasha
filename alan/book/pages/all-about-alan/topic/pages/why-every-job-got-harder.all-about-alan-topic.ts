import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whyEveryJobGotHarder = {
  id: "01a0c5eb-1073-74a8-b21f-c0114b21e411",
  type: "page-type/all-about-alan-topic",
  slug: "why-every-job-got-harder",
  title: "Why Every Job Got Harder",
  definition: "relationships better early and harder with tenure, and the three accounts of why",
  parents: ["all-about-alan-topic/who-is-safe-to-be-around"],
  related: [
    "all-about-alan-topic/the-company-years",
    "all-about-alan-topic/why-getting-close-hurts",
  ],
  settled:
    "Across four jobs, of four, four, two and five years, and every move, my relationships were better early and got harder as the years accumulated.\n\nA fresh start puts me back in the safe-stranger zone, which explains both why fresh starts appeal and why staying is hard.\n\nThe exact mechanism is uncertain, and it may be more than one thing.\n\nMy hard-learned social skill is tuned for the shallow end, so my maps get less accurate as a relationship deepens past what they were trained on.\n\nPeople ask things of me, and through the isolated years I never had enough to give, so repeated giving past empty made people less safe over time.\n\nAnd the corrections accumulate. Intimates correct me more, from good intent and without a map of my brain, so the triggers are laid down faster than the familiarity banks safety.",
} as const satisfies AllAboutAlanTopic
