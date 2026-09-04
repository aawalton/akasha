import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const howMuchAttentionIHave = {
  id: "01a06559-9d65-7578-bba4-a0c7e7a3691f",
  pageTypeSlug: "all-about-alan-topic",
  slug: "how-much-attention-i-have",
  title: "How Much Attention I Have",
  definition: "what is left to spend after the room I am in has taken its share",
  parentSlugs: ["how-my-attention-works"],
  relatedSlugs: ["what-my-senses-cost-me"],
  settled:
    "Some of it goes on processing whatever is around me, whether I am using it or not.\n\nThat cost stays about the same while the total swings, so it can be a rounding error or the whole budget.\n\nToo much and too little stimulation are one fixed cost read against a budget that moved.",
  unsettled:
    "The draw has never been measured against a known total, so the proportion is a felt read rather than a number.\n\nWhether it is genuinely fixed, or costs more in a louder room, is open.\n\nAnd whether several streams at once draw on one pool or on different ones is unsettled.\n\nWhat a game specifically supplies to spare attention, and whether something else would serve as well, is unidentified.",
} as const satisfies AllAboutAlanTopic
