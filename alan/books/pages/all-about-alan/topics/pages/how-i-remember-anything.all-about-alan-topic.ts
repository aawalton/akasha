import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.types.ts"

export const howIRememberAnything = {
  id: "01a06559-9d65-7615-99ee-ddcd2c23191d",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "how-i-remember-anything",
  title: "How I Remember Anything",
  definition:
    "one thing cueing the next, all the way through, with nothing stored to be called up freely",
  parents: ["alan"],
  related: ["how-my-attention-works", "how-a-skill-gets-into-me"],
  settled:
    "A cue fires and brings the next thing, which is itself the cue for the one after.\n\nThe same shape runs three places: memorising a text, giving a talk, and reading the next act off the state of my system.\n\nNesting the cues lets me re-enter a text at any level, and stops one missed word breaking the whole chain.\n\nIt carries across discrete symbols and does not carry across movement.\n\nI use the cascade only for memorising text, usually a whole book. No other content goes in that way.\n\nI split a passage at whichever of paragraph, sentence or clause gets me under about forty words, memorise at that size, then cascade up through the components to the paragraph level, then cascade through the passage at the paragraph level.\n\nA cascade is: memorise one, memorise two, review one to two, memorise three, review two to three, review one to three, and on through the passage. The review scopes stack logarithmically, and I add a scope at every power of two.",
} as const satisfies AllAboutAlanTopic
