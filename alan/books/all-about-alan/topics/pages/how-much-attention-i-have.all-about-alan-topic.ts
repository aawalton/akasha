import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const howMuchAttentionIHave = {
  id: "01a06559-9d65-7578-bba4-a0c7e7a3691f",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "how-much-attention-i-have",
  title: "How Much Attention I Have",
  definition: "what is left to spend after the room I am in has taken its share",
  parents: ["how-my-attention-works"],
  related: ["what-my-senses-cost-me"],
  settled:
    "Some of it goes on processing whatever is around me, whether I am using it or not.\n\nThat cost stays about the same while the total swings, so it can be a rounding error or the whole budget.\n\nToo much and too little stimulation are one fixed cost read against a budget that moved.",
} as const satisfies AllAboutAlanTopic
