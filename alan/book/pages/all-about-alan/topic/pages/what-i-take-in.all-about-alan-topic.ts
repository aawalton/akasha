import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatITakeIn = {
  id: "01a06559-9d65-7672-ae18-b2d30da47387",
  type: "page-type/all-about-alan-topic",
  slug: "what-i-take-in",
  title: "What I Take In",
  definition: "reading wide on purpose, because a false model only looks tidy on a narrow set",
  parents: ["all-about-alan-topic/how-i-know-things"],
  related: [
    "all-about-alan-topic/small-bites-of-many-things",
    "all-about-alan-topic/playing-the-long-game",
  ],
  settled:
    "I read authors rather than books. A whole body of work is a whole worldview, and I merge it into my one model wherever I judge it true.\n\nI get one merge rather than a shelf, so a fragment would fold in a fragment. The whole body of work is what I want in front of me.\n\nI am working through the entire Great Courses library, about three thousand hours of ten thousand done.\n\nBreadth is a defence rather than a taste. Data from outside a theory is what forces its patches into the open.\n\nThe two halves do different jobs. An author taken whole hands me a complete model to test for tightness. Sweeping across every field supplies the outside data that test has to run over. Without the first I would be judging fragments, and without the second a narrow model keeps reading as true.\n\nIt began as loving to read, homeschooled in fourth grade, long before anything rested on it.",
} as const satisfies AllAboutAlanTopic
