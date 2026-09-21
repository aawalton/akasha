import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theLawThatLetsUsHomeschool = {
  id: "01a0c599-4ace-7114-98b6-70c7aa216d63",
  type: "page-type/all-about-alan-topic",
  slug: "the-law-that-lets-us-homeschool",
  title: "The Law That Lets Us Homeschool",
  definition: "the state framework the children's schooling rests on, and what could erode it",
  parents: ["all-about-alan-topic/where-the-government-touches-me"],
  related: ["all-about-alan-topic/trusting-a-person-not-an-institution"],
  settled:
    "Utah wrote its homeschool law friendly. One notice of intent a year is the whole of it. No curriculum to get approved, no testing, no qualification asked of me as a parent.\n\nSo it earns a B, the only one anywhere in what I depend on from a government.\n\nHow our children are educated rests on it, so it rests on Utah going on honouring what it wrote.\n\nThe B is in the current legislature rather than in anything that would hold if the legislature changed. What I watch for is the law being worn away.",
} as const satisfies AllAboutAlanTopic
