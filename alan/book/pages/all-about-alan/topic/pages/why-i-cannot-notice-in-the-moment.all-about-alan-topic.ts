import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whyICannotNoticeInTheMoment = {
  id: "01a0c5a5-a895-7cd7-af89-8b616347c94f",
  type: "page-type/all-about-alan-topic",
  slug: "why-i-cannot-notice-in-the-moment",
  title: "Why I Cannot Notice In The Moment",
  definition: "watching myself live against watching myself afterwards, and the gap between them",
  parents: ["all-about-alan-topic/how-i-read-myself"],
  related: [
    "all-about-alan-topic/the-four-shapes-my-executive-trouble-takes",
    "all-about-alan-topic/reading-a-feeling-off-my-behaviour",
    "all-about-alan-topic/where-i-go-below-zero",
  ],
  settled:
    "Watching myself while a thing is happening is one of the hardest things I do, and mostly I do not manage it.\n\nWatching myself afterwards is one of the strongest. The reputation I have for being introspective is earned by that second kind: deliberate, after the fact, and analytic.\n\nThe likely reason is that noticing live runs on a felt sense that this is not working, and I have no such signal. What is left is explicit review, which is necessarily slower and offline.\n\nThe strong half masks the weak one, from outside and partly from me too.",
} as const satisfies AllAboutAlanTopic
