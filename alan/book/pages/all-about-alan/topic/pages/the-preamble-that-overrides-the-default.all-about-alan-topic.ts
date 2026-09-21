import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const thePreambleThatOverridesTheDefault = {
  id: "01a0c629-b867-7bc4-85aa-b70410cdcd9f",
  type: "page-type/all-about-alan-topic",
  slug: "the-preamble-that-overrides-the-default",
  title: "The Preamble That Overrides The Default",
  definition: "the opening phrase I put in front of a claim to keep it from reading as flat",
  parents: ["all-about-alan-topic/what-sounding-sure-costs-me"],
  related: ["all-about-alan-topic/the-five-ways-something-becomes-automatic"],
  settled:
    "The direct fix is a preamble that overrides the default: I am not sure about this, but; my best guess is; I might be wrong, but.\n\nIt works when I remember it, and remembering is the bottleneck, gated by metacognition and stress capacity. When my health is higher I hedge more and the gap narrows.\n\nEnforcing it in the moment has never worked as well as internalising the concept until the new behaviour fires on its own. It is probably improving slowly, but about eighteen months of isolation leaves the data sparse.",
} as const satisfies AllAboutAlanTopic
