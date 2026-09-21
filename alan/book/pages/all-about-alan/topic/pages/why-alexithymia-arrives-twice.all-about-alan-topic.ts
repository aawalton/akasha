import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whyAlexithymiaArrivesTwice = {
  id: "01a0c591-d663-7f6a-8e85-0835eac69ab5",
  type: "page-type/all-about-alan-topic",
  slug: "why-alexithymia-arrives-twice",
  title: "Why Alexithymia Arrives Twice",
  definition: "the two separate routes by which naming a feeling is closed to me",
  parents: ["all-about-alan-topic/what-comes-with-it"],
  related: [
    "all-about-alan-topic/the-feeling-i-cannot-get-at",
    "all-about-alan-topic/the-feelings-i-can-name",
    "all-about-alan-topic/being-autistic",
  ],
  settled:
    "One route is autism. The patterns of feeling never settle in quietly by themselves, because nothing in me habituates them into place.\n\nThe other is aphantasia. I hold no remembered feeling and no imagined one, so there is no reference to match a present feeling against and name it by.\n\nEither would be enough on its own. I have both.",
} as const satisfies AllAboutAlanTopic
