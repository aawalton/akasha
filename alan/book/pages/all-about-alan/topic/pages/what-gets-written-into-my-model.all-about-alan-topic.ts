import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatGetsWrittenIntoMyModel = {
  id: "01a0c59c-0823-783b-b8f2-5da5fe7f85b1",
  type: "page-type/all-about-alan-topic",
  slug: "what-gets-written-into-my-model",
  title: "What Gets Written Into My Model",
  definition: "the four things that decide whether an experience reaches my map at all",
  parents: ["all-about-alan-topic/how-i-know-things"],
  related: [
    "all-about-alan-topic/what-repetition-encodes",
    "all-about-alan-topic/how-understanding-arrives",
  ],
  settled:
    "There is no store of episodes, so what reaches my map is selected. Four things raise the odds of a write.\n\nHow often the same pattern comes round. How many other things in the map it ties to. How much it accounts for. How much feeling was running at the time.\n\nThey do not weigh the same. Feeling is mostly quiet in me and a strong one is rare, so across the run it accounts for very little, even though it does spike the odds on the rare occasion it fires.\n\nHow much a thing accounts for is the strongest of the four by some way.\n\nThis is the same shape as the other write path. There a bad pairing clears the bar on intensity. Here an experience clears it on how much it explains.",
} as const satisfies AllAboutAlanTopic
