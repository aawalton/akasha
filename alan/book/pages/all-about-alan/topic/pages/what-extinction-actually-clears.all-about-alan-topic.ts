import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatExtinctionActuallyClears = {
  id: "01a0ca0f-03fc-77d9-8289-157635e0c2e1",
  type: "page-type/all-about-alan-topic",
  slug: "what-extinction-actually-clears",
  title: "What Extinction Actually Clears",
  definition: "the one response and the one context an extinction of mine reaches",
  parents: ["all-about-alan-topic/how-an-alarm-wears-off"],
  related: [
    "all-about-alan-topic/the-four-things-people-call-habituation",
    "all-about-alan-topic/how-a-scarred-domain-comes-back",
  ],
  settled:
    "An extinction clears one stress response in one context rather than that response everywhere.\n\nWhat went in game PVP was the initiative stress response from conflict, applied to that specific context.",
} as const satisfies AllAboutAlanTopic
