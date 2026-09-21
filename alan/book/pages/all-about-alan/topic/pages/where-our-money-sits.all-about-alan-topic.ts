import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whereOurMoneySits = {
  id: "01a0c58f-c8db-762e-a0b3-a253ed4fb30a",
  type: "page-type/all-about-alan-topic",
  slug: "where-our-money-sits",
  title: "Where Our Money Sits",
  definition: "the financial institutions we depend on, and the grade each one holds",
  parents: ["all-about-alan-topic/the-money-we-are-living-on"],
  related: [
    "all-about-alan-topic/how-i-grade-an-organisation",
    "all-about-alan-topic/which-organisations-i-trust",
  ],
  settled:
    "Vanguard holds about one point seven million in liquid stock, the retirement account and a Roth, and grades B. Mutual ownership is strong. Service quality slipping lately is the early sign of the other thing.\n\nEverything else grades D. Citi has our checking and the Costco card. Chase has a travel card and Synchrony the Amazon one, both of which I could lose without much. BSI services the roughly five-hundred-thousand mortgage. Venmo is for Facebook Marketplace. TurboTax does the taxes.\n\nThe credit union in Provo holds legacy savings for relatives who cannot hold assets in their own names, and a roughly five-thousand family trust collecting my father's book royalties with my four siblings. Its D is small-bank stability after watching SVB go, which member ownership does not offset.\n\nI am researching the six largest US banks for one rated above D, to give our checking somewhere to go.",
} as const satisfies AllAboutAlanTopic
