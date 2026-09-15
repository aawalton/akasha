import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatMyScaffoldingBuysMe = {
  id: "01a06559-9d65-7358-81b2-e2e08ee15a62",
  type: "page-type/all-about-alan-topic",
  slug: "what-my-scaffolding-buys-me",
  title: "What My Scaffolding Buys Me",
  definition:
    "the strengths my harness gets to a finish that my executive function could not have alone",
  parents: ["all-about-alan-topic/the-scaffolding-i-built"],
  related: [
    "all-about-alan-topic/how-i-get-anything-done",
    "all-about-alan-topic/how-different-i-actually-am",
  ],
  settled:
    "It routes four things into work: hyperfocus, depth across several streams at once, systematic precision, and how far my pattern recognition reaches.\n\nWithout it those sit behind an executive function that cannot get them to a finish.",
} as const satisfies AllAboutAlanTopic
