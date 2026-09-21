import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const notKnowingWhatIHaveAlreadyDone = {
  id: "01a0c58e-94ea-7bcf-b467-d4c4743feb50",
  type: "page-type/all-about-alan-topic",
  slug: "not-knowing-what-i-have-already-done",
  title: "Not Knowing What I Have Already Done",
  definition: "what I did a moment ago not surviving in me, and what a job has to look like",
  parents: ["all-about-alan-topic/what-i-cannot-play-forward"],
  related: [
    "all-about-alan-topic/the-scaffolding-i-built",
    "all-about-alan-topic/the-coloured-circles-i-run-on",
  ],
  settled:
    "Nothing sensory and nothing emotional carries forward, so what persists across time is concepts and nothing else.\n\nWhat I have done is not a concept. It is too thin to encode as one, and I can almost never bring it back.\n\nSo a job has to be arranged so the next step reads off what is in front of me. Nothing in my head says where I got to.\n\nKeeping the state outside me is structural rather than a convenience. What other people carry in their heads I carry in a file.\n\nA sequence of actions does not become automatic in me the way it does in other people, and even the written list does not survive unless the writing lands somewhere outside me.",
} as const satisfies AllAboutAlanTopic
