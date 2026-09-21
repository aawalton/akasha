import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const sleep = {
  id: "01a06559-9d65-7d9a-ad90-89259d991819",
  type: "page-type/all-about-alan-topic",
  slug: "sleep",
  title: "Sleep",
  definition: "how I sleep, and what it does for me",
  parents: ["all-about-alan-topic/resources"],
  settled:
    "Seven hours most days at the moment, where I want nine or ten. For most of 2025 I was getting the nine or ten.\n\nStress is what is trimming the hours now, rather than Vyvanse.\n\nThat stress is almost entirely from being social, mostly with Jen. The social has been positive and I pay a cost for the social anyway.\n\nThe cost lands the same night, and recovery from the cost takes a few days.\n\nI have social structured in at least twice a week at the moment, so I sit in the seven-hour ballpark most days.\n\nI almost always wake without an alarm. The pull to stay up that most adults have is simply missing in me, and in its place there is a want-to-sleep signal that never switches off. That is what being chronically under-recovered feels like from inside.\n\nIt is the nearest thing to a cure-all I have found.",
} as const satisfies AllAboutAlanTopic
