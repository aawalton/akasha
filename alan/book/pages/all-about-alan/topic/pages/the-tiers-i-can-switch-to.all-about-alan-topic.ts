import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theTiersICanSwitchTo = {
  id: "01a0c59a-b98c-7d5c-828b-af104325859d",
  type: "page-type/all-about-alan-topic",
  slug: "the-tiers-i-can-switch-to",
  title: "The Tiers I Can Switch To",
  definition: "six kinds of alternative, ordered by how much trust each one still asks of me",
  parents: ["all-about-alan-topic/getting-out-from-under-a-dependency"],
  related: [
    "all-about-alan-topic/which-organisations-i-trust",
    "all-about-alan-topic/where-the-government-touches-me",
  ],
  settled:
    "Six kinds, ordered by how much trust each still asks of me.\n\nA large organisation that has earned it. One ongoing relationship for another, but this one has been tested.\n\nA small or local one. They usually lack the scale that makes capture possible, and answer to local pressure instead. They are also easier to lose, so they suit a need that tolerates substitution rather than one needing continuity.\n\nA co-op or a mutual, where the owners are the customers. Credit unions, rural electric co-ops. The extraction loop is structurally weaker. They can still drift and still be captured, and I suspect the decades condition relaxes for them, because the structure does some of the work a record does for a corporation.\n\nDoing it myself.\n\nA protocol with many participants and no organisation at all, where trust is spread rather than placed. It costs usability and maturity, so it suits only what is worth the friction.\n\nA public service, each tested the same way rather than trusted by default.",
} as const satisfies AllAboutAlanTopic
