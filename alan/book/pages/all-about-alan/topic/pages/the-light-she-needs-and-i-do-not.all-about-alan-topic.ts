import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theLightSheNeedsAndIDoNot = {
  id: "01a0c5ea-1f9d-77b2-95b7-21570f783f9a",
  type: "page-type/all-about-alan-topic",
  slug: "the-light-she-needs-and-i-do-not",
  title: "The Light She Needs And I Do Not",
  definition: "one input, opposite for each of us, and how the rooms get settled",
  parents: ["all-about-alan-topic/how-i-keep-light-down", "all-about-alan-topic/living-with-jen"],
  settled:
    "Ambient light drains me. It lifts Jen. For her it is positive stimulation and it helps her get things started, which is the inverse of what it does to me.\n\nSo the lighting is settled room by room, and by default I defer to her.\n\nThe override is when I am really not doing well. Below that line the light goes off whatever the room.\n\nDeferring is not a cost paid once when the rule was set. It runs on as a standing cost the whole time the accommodation does.",
} as const satisfies AllAboutAlanTopic
