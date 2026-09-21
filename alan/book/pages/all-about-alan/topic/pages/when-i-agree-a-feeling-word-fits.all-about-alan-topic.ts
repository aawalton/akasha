import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whenIAgreeAFeelingWordFits = {
  id: "01a06559-9d65-70c8-a743-e43077480c90",
  type: "page-type/all-about-alan-topic",
  slug: "when-i-agree-a-feeling-word-fits",
  title: "When I Agree A Feeling Word Fits",
  definition: "saying yes, that is the word, and what that yes is actually running on",
  parents: ["all-about-alan-topic/reading-a-feeling-off-my-behaviour"],
  related: [
    "all-about-alan-topic/the-feelings-i-can-name",
    "all-about-alan-topic/the-feeling-i-cannot-get-at",
  ],
  settled:
    "It can be reading a live tell, or matching a definition with nothing under it. Both come out of me as the same yes.\n\nBoth can be correct. Only the first claims a feeling is present; the second says the behaviour fits the word.\n\nThe question to ask of any yes of mine is which of the two it was.\n\nWhen my safety is low I treat the felt sensor as noise.\n\nI do not pick one instrument and throw the other away. I weight each by how far it can be trusted in the state I am in now. High safety and the felt read earns its weight; low safety and the observed one carries it.\n\nWhich is why low safety pushes more of my agreeing toward the definition-matching kind. The channel that carries a present signal is the one that has gone quiet.",
} as const satisfies AllAboutAlanTopic
