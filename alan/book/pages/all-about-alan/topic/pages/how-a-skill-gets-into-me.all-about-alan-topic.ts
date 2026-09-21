import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const howASkillGetsIntoMe = {
  id: "01a06559-9d65-7092-af1c-1dd1b088c28e",
  type: "page-type/all-about-alan-topic",
  slug: "how-a-skill-gets-into-me",
  title: "How A Skill Gets Into Me",
  definition: "the two places a skill can land in me, and what it takes to put one there",
  parents: ["all-about-alan-topic/alan"],
  related: [
    "all-about-alan-topic/what-repetition-encodes",
    "all-about-alan-topic/how-i-get-anything-done",
  ],
  settled:
    "A skill lands as a trained weight or as a concept, never as a memory of the room I learned it in.\n\nThat missing layer is why a skill costs so much to build and why it carries anywhere once it is built.\n\nThinking about something outside the moment is training rather than idling. It moves the weights.\n\nA motor pattern is the exception: it will not train from imagining it, because there is nothing in me to imagine it with. Running the motion at the smallest intensity it will go does train it, the way fingering a song's notes without playing them does.\n\nIn the moment I run on what is already trained, plus whatever I can read off the scaffolding around me. The conceptual work on myself only runs outside the moment, because in the moment my own reading of my own thinking is not reliable enough to lean on. The scaffolding is what stands in for it while I am in the thing.\n\nThe count is per small pattern. A fluent skill is a stack of them at different stages.",
} as const satisfies AllAboutAlanTopic
