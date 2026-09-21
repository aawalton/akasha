import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const howIPriceAHarmSpreadOverMany = {
  id: "01a0c59a-5aa4-745d-a6f3-bcad2f7b29f3",
  type: "page-type/all-about-alan-topic",
  slug: "how-i-price-a-harm-spread-over-many",
  title: "How I Price A Harm Spread Over Many",
  definition: "the harm-weighted agency of a group, and the benefit a decision has to clear",
  parents: ["all-about-alan-topic/the-formula-that-prices-a-harm"],
  settled:
    "Where a decision harms many people unequally I take each harmed person's agency over the harm and their share of the total utility harm, with the shares summing to one, and form the harm-weighted agency of the group.\n\nThe decision is permissible only where the total benefit exceeds the total harm divided by that number. A group at a half needs twice the benefit. A group at a tenth needs ten times. One person alone is just their own agency.\n\nWeighting agency by share of harm is what stops laundering. A severe harm to one person with little authorship cannot be offset by padding the group with barely harmed people who have plenty, because their tiny share gives them tiny weight.\n\nMinority protection comes out structural. A harm landing on people with little authorship over it demands a proportionally larger benefit, not because they were counted and found few, but because their authorship was low. No headcount enters anywhere.",
} as const satisfies AllAboutAlanTopic
