import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theFiveWaysSomethingBecomesAutomatic = {
  id: "01a06559-9d65-7bd5-a94a-221268ff34f5",
  type: "all-about-alan-topic",
  slug: "the-five-ways-something-becomes-automatic",
  title: "The Five Ways Something Becomes Automatic",
  definition: "the five different systems that can make a thing automatic in me",
  parents: ["all-about-alan-topic/how-a-skill-gets-into-me"],
  related: [
    "all-about-alan-topic/what-repetition-encodes",
    "all-about-alan-topic/the-scaffolding-i-built",
  ],
  settled:
    "They are sensory habituation, picking things up socially without trying, a response fired by an outside cue, fitting new things into what I already know, and running a sequence of actions as one.",
} as const satisfies AllAboutAlanTopic
