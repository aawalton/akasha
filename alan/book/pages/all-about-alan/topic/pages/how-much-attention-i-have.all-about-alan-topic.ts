import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const howMuchAttentionIHave = {
  id: "01a06559-9d65-7578-bba4-a0c7e7a3691f",
  type: "page-type/all-about-alan-topic",
  slug: "how-much-attention-i-have",
  title: "How Much Attention I Have",
  definition: "what is left to spend after the room I am in has taken its share",
  parents: ["all-about-alan-topic/how-my-attention-works"],
  related: ["all-about-alan-topic/what-my-senses-cost-me"],
  settled:
    "Some of it goes on processing whatever is around me, whether I am using it or not.\n\nThat cost stays about the same while the total swings, so it can be a rounding error or the whole budget.\n\nToo much and too little stimulation are one fixed cost read against a budget that moved.\n\nWhen my attention is low, that fixed cost is half my budget or more. At a hundred percent and over nothing is left, the budget overflows, and the overflow is what overstimulation is.\n\nWhen my attention is high I do not usually notice the cost enough to measure it. So much is left over that the cost disappears, and having nothing bidding for what remains reads as understimulation.\n\nSo cutting the fixed cost hands me back spendable attention directly. Keeping little around me and the sensory kit I carry are both that one move, and both pay most when my budget is smallest.",
} as const satisfies AllAboutAlanTopic
