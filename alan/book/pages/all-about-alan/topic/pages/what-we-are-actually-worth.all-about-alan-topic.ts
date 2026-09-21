import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatWeAreActuallyWorth = {
  id: "01a0c59f-c137-770e-b029-08f58c5e50cc",
  type: "page-type/all-about-alan-topic",
  slug: "what-we-are-actually-worth",
  title: "What We Are Actually Worth",
  definition: "the three pieces I count separately, and which number I plan against",
  parents: ["all-about-alan-topic/the-money-we-are-living-on"],
  related: ["all-about-alan-topic/where-our-money-sits"],
  settled:
    "These are the figures as of 15 May 2026. Some of them move.\n\nAbout one point seven million in liquid stock, and about five hundred thousand of equity in the house at 1350 Apple Ave. About two point two million between them, and that is the whole of what is reachable and exposed.\n\nThe house would top out near one point two million on an optimistic read, and that number moves with the market rather than sitting still. About five hundred thousand of mortgage is outstanding against it.\n\nSeven hundred thousand of equity is what the optimistic top would give me. About five hundred thousand is what I actually plan against.\n\nAbout a tenth of net worth is stock in Latitude, the startup I cofounded. It is held outside any brokerage, so I leave it out of the exposed total and carry it as an illiquid dependency of its own.",
} as const satisfies AllAboutAlanTopic
