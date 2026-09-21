import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatARealFlawDoes = {
  id: "01a0c5a9-dd99-709d-9dfb-6081ca7c2e53",
  type: "page-type/all-about-alan-topic",
  slug: "what-a-real-flaw-does",
  title: "What A Real Flaw Does",
  definition: "a flaw making a face a person, and a too-perfect face reading uncanny",
  parents: ["all-about-alan-topic/what-draws-me-to-someone"],
  related: ["all-about-alan-topic/why-i-have-to-be-perfect", "all-about-alan-topic/being-known"],
  settled:
    "A real flaw makes a face a person, and a person is therefore safe. Too perfect reads uncanny, and uncanny reads unsafe.\n\nThe deepest safety is being known, and a person is the thing that can know. A perfect exterior cannot.",
} as const satisfies AllAboutAlanTopic
