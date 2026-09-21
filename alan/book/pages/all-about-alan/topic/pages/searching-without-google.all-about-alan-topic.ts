import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const searchingWithoutGoogle = {
  id: "01a0c5a6-6b23-7ca2-823d-99109734b484",
  type: "page-type/all-about-alan-topic",
  slug: "searching-without-google",
  title: "Searching Without Google",
  definition: "the way off my default search, and why it waits on the machine rather than a rival",
  parents: ["all-about-alan-topic/where-my-reading-comes-from"],
  related: [
    "all-about-alan-topic/the-solar-on-the-roof",
    "all-about-alan-topic/getting-out-from-under-a-dependency",
  ],
  settled:
    "Kagi, Perplexity and DuckDuckGo all exist today. Each carries reservations of its own and a cost to move to, and each one only swaps who I am asking.\n\nThe move I actually want is a model running on a machine in the house answering some of the questions instead. That is capability I own rather than another provider.\n\nIt is the same purchase that gets me out from under an AI subscription, so the one buy does both.\n\nWhich is why search is not its own piece of work. It rides on a decision I have already made for another reason.",
} as const satisfies AllAboutAlanTopic
