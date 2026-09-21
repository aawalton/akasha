import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theTwoRulesIOverthrew = {
  id: "01a0c599-27d2-7422-be35-e28147d5b6d1",
  type: "page-type/all-about-alan-topic",
  slug: "the-two-rules-i-overthrew",
  title: "The Two Rules I Overthrew",
  definition: "the other way a childhood rule of mine came off, by taking out its whole class",
  parents: ["all-about-alan-topic/the-five-rules-i-grew-up-with"],
  related: [
    "all-about-alan-topic/digging-up-an-old-belief",
    "all-about-alan-topic/rules-instead-of-a-brake",
  ],
  settled:
    "Two of the rules I grew up with are gone: do what people tell you to, and follow all of the rules.\n\nThey did not come off one belief at a time. The weight of what was expected of me got heavy enough that I took on a blanket rebellion against expectation itself, mine as much as anyone's.\n\nBoth belonged to the same class, obey the expectation, so taking out the class took out both at once.\n\nWhat came of it is one rule I chose: if I do not want to, I am not allowed to.\n\nThe thing that forced it was physical rather than argued. At around twenty I hit a hard choice between applying social cues to avoid punishment and raw physiological survival. My fawn response almost killed me medically. That broke fawn as a safe way to avoid punishment and flipped me fast from an Upholder, who keeps outer and inner expectations alike, to a Rebel, who resists both.\n\nSo there are two routes off a rule. Digging re-compresses one belief inside it. This one throws out the whole class it belonged to.",
} as const satisfies AllAboutAlanTopic
