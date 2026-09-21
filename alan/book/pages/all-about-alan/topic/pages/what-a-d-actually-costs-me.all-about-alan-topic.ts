import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatADActuallyCostsMe = {
  id: "01a0c591-002f-76e9-933a-95557bca173d",
  type: "page-type/all-about-alan-topic",
  slug: "what-a-d-actually-costs-me",
  title: "What A D Actually Costs Me",
  definition: "why a bad grade does not by itself make me move",
  parents: ["all-about-alan-topic/how-i-grade-an-organisation"],
  settled:
    "The company that does my taxes has lobbied for years to keep the tax office from filing for me free, and has a record of dark patterns. That is a clear D.\n\nStaying costs me under a hundred a year and about half an hour. Leaving would cost the same or more.\n\nSo nothing has to happen. The grade is the record of a concern I am knowingly carrying, and that is the whole job of a D.",
} as const satisfies AllAboutAlanTopic
