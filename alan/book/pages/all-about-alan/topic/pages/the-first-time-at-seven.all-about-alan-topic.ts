import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theFirstTimeAtSeven = {
  id: "01a0c60b-92d8-7010-afe5-eed651ba0735",
  type: "page-type/all-about-alan-topic",
  slug: "the-first-time-at-seven",
  title: "The First Time At Seven",
  definition: "the first time I considered killing myself, and the rigour that stopped me",
  parents: ["all-about-alan-topic/what-has-kept-me-here"],
  related: [
    "all-about-alan-topic/the-stories-that-buy-me-a-day",
    "all-about-alan-topic/why-i-sound-surer-than-i-am",
  ],
  settled:
    "The first time was at seven. I considered killing myself so I would die before the age of accountability, before I could be held responsible for sin, and not have to carry that worry.\n\nI did not. Not because I was talked out of it, and not because I was afraid. I doubted the certainty of my own beliefs: if I was rational to consider that as a choice, I was probably accountable for my choices already. The plan depended on a certainty I did not have, so the rigour that built it dismantled it. My refusal to act on a belief I could not prove is what kept me alive.\n\nIt is the same gate that runs everywhere else in me: I do not act past my actual certainty. At seven it was load-bearing in the most literal way.\n\nThe guardrails block the act. They do not supply the will to keep going. That has come from reading the stories of other people who suffered the way I did and survived it, to give me hope enough for one more day.",
} as const satisfies AllAboutAlanTopic
