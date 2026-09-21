import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theLettersAndWhoAnchorsThem = {
  id: "01a0c601-0524-779f-9c1a-01078117caee",
  type: "page-type/all-about-alan-topic",
  slug: "the-letters-and-who-anchors-them",
  title: "The Letters And Who Anchors Them",
  definition: "what each of the five grades means, and the one organisation that anchors each band",
  parents: ["all-about-alan-topic/how-i-grade-an-organisation"],
  related: [
    "all-about-alan-topic/what-one-trust-score-carries",
    "all-about-alan-topic/when-a-company-changes-hands",
    "all-about-alan-topic/the-f-that-is-a-wound",
  ],
  settled:
    "A is trusted unreservedly: ownership structured to prevent future capture, a long record, active resistance under pressure, no reservation on any part. Patagonia is the anchor. The 2022 transfer of ownership to the Patagonia Purpose Trust and the Holdfast Collective locks the mission against capture, so trust does not rest on whoever leads it.\n\nB is trusted with a reservation. Costco is the anchor: it does not require third-party testing for the supplements it sells, and being publicly traded is a separate reservation.\n\nC is acceptable for now, the neutral default for what I have not researched and do not distrust.\n\nD is clear misalignment I knowingly tolerate, because it is low-stakes, or has no alternative, or switching costs more than staying.\n\nF is a demonstrated bad actor I leave whatever it costs and never start with. OpenAI is the anchor: a non-profit converted to a for-profit, the board drama of 2023, the safety and alignment departures, visible mission abandonment.",
} as const satisfies AllAboutAlanTopic
