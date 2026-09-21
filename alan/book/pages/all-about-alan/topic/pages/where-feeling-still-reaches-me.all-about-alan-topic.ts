import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whereFeelingStillReachesMe = {
  id: "01a0c595-0103-7ec0-b44c-8f0a019fc6c1",
  type: "page-type/all-about-alan-topic",
  slug: "where-feeling-still-reaches-me",
  title: "Where Feeling Still Reaches Me",
  definition: "the line between the feeling I have now and the feeling I cannot pre-play",
  parents: ["all-about-alan-topic/why-feeling-cannot-take-my-thinking"],
  related: [
    "all-about-alan-topic/what-i-cannot-play-forward",
    "all-about-alan-topic/the-score-i-keep-on-myself",
  ],
  settled:
    "Present feeling I have. It fires off a cue in front of me and it moves what I do right now.\n\nPre-played feeling I do not have. I cannot render a candidate belief and feel how it would go over time.\n\nThat second one is the channel that would let a more bearable belief become a more believable one, and it is the dark one. Comfort gets no vote on what I take to be true.\n\nWhich side of that line a thing needs decides whether feeling reaches it at all. Present action, yes. Belief and any judgment running over time, no.\n\nSo anything meant to move me has to work off a present irritant. A system built on a pre-felt payoff is reaching for the channel I do not have.",
} as const satisfies AllAboutAlanTopic
