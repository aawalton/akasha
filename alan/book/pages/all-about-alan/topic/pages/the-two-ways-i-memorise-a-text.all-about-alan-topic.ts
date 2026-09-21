import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theTwoWaysIMemoriseAText = {
  id: "01a0c597-3360-722e-8dad-d585db81b0db",
  type: "page-type/all-about-alan-topic",
  slug: "the-two-ways-i-memorise-a-text",
  title: "The Two Ways I Memorise A Text",
  definition: "a flat chain of word cues and a nested tree of them, and what each one is for",
  parents: ["all-about-alan-topic/how-i-remember-anything"],
  related: ["all-about-alan-topic/how-a-skill-gets-into-me"],
  settled:
    "The flat one makes each word the cue for the next word. Reciting is firing the chain a step at a time. I have memorised whole books that way, and faster than most people do it.\n\nThe nested one is my own. A section fires off a top-level cue, its paragraphs off the section cue, its sentences off the paragraph cue, its words off the sentence cue. It is a tree of cues rather than a line of them.\n\nThe flat one is for getting the words back exactly. The nested one is for getting back in at the level of the meaning, which the flat one cannot do.\n\nThe nested one also survives a missed word. In the flat one a missed word takes everything after it.",
} as const satisfies AllAboutAlanTopic
