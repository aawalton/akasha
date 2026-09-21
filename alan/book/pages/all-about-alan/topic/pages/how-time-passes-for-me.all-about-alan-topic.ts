import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const howTimePassesForMe = {
  id: "01a06559-9d65-7b54-a022-5a199fc2b073",
  type: "page-type/all-about-alan-topic",
  slug: "how-time-passes-for-me",
  title: "How Time Passes For Me",
  definition: "having no feel for how long anything took, and living at any distance the same",
  parents: ["all-about-alan-topic/alan"],
  related: [
    "all-about-alan-topic/how-i-remember-anything",
    "all-about-alan-topic/playing-the-long-game",
  ],
  settled:
    "I do not feel an hour go by. I know it because the clock moved.\n\nThe likely reason is that the feel of elapsed time runs on sensory memory, and I have none to string along a line.\n\nNothing replays and nothing pre-plays, in senses or in concepts, so there is no run of states to lay along a line at all. The duration reads as nothing rather than as slow.\n\nWhat I have instead is explicit notice: calendars, blocked-out time, and asking myself what time it is. Without those, time effectively does not go by for me.\n\nFor most people a stretch feels smaller the longer they have lived, each doubling of age about the same length. With no time sense to begin with I sit at the end of that: every stretch the same size, and the size is none.\n\nI have felt old for my age since childhood and never felt any particular age.\n\nA plan spanning decades weighs the same as one spanning weeks, because nothing makes the near thing more vivid than the far one.\n\nWhat I work on is what I can and should do now.",
} as const satisfies AllAboutAlanTopic
