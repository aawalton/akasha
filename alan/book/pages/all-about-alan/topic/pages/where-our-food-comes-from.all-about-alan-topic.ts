import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whereOurFoodComesFrom = {
  id: "01a0c595-7d71-76de-a1cb-52f6d4eeb6fd",
  type: "page-type/all-about-alan-topic",
  slug: "where-our-food-comes-from",
  title: "Where Our Food Comes From",
  definition: "the shops the household food runs through, and how far I trust each one",
  parents: ["all-about-alan-topic/which-organisations-i-trust"],
  related: [
    "all-about-alan-topic/why-i-shop-at-costco-and-not-walmart",
    "all-about-alan-topic/how-i-eat",
  ],
  settled:
    "Costco is the household's main source of bulk and staples, and I grade it B. The reservations are that nobody independent tests the supplements they sell, and that being publicly traded leaves them open to capture. Those are what hold the grade at B rather than A.\n\nSmiths is where we go for what Costco does not carry, or does not carry in a household-sized quantity. It is a D, and the D comes from the category rather than from anything they did. It is replaceable with some friction.\n\nWalmart, mostly the grocery delivery, covers what neither of the others does, and takes over when I have no bandwidth to shop in person. Also a D.\n\nWe have no CSA, no farmers market, no direct producer and no specialty supplier. That is a gap rather than a decision.",
} as const satisfies AllAboutAlanTopic
