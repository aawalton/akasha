import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theLayersILiveInside = {
  id: "01a0c5a1-96c9-7ed7-af8e-70b228aecbe1",
  type: "page-type/all-about-alan-topic",
  slug: "the-layers-i-live-inside",
  title: "The Layers I Live Inside",
  definition:
    "the constraints nested one within another, each reachable only through the one above",
  parents: ["all-about-alan-topic/getting-out-from-under-a-dependency"],
  related: [
    "all-about-alan-topic/no-exit-against-an-expensive-exit",
    "all-about-alan-topic/where-the-government-touches-me",
    "all-about-alan-topic/the-five-of-us",
  ],
  settled:
    "Four of my constraints sit inside one another rather than side by side. Being a US citizen, then living in Utah inside that, then Utah County and Provo inside that, then owning this house inside that.\n\nTo change county I can stay in Utah. To leave Utah I am still bound to the US. To leave the US takes expatriation, and the price of that is extreme: the exit tax on what we hold, the family, no way back, and the draft registration that follows me out anyway.\n\nSo a layer is only reachable by settling the one above it first, and I do not work on an inner layer before deciding the outer one.\n\nA grade at one layer is relative to the layers assumed around it. Utah at C given US citizenship is a different reading from Utah at C outright.\n\nWhat would re-open a layer: federal escalation at the top, the homeschool law eroding at the state one, the local people we rely on leaving or the fibre changing hands at the city one, and the children growing up at the house.",
} as const satisfies AllAboutAlanTopic
