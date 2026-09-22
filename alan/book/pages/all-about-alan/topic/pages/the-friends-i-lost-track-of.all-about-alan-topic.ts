import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theFriendsILostTrackOf = {
  id: "01a0c5a4-e8ec-7978-8c00-6c9393d3a599",
  type: "page-type/all-about-alan-topic",
  slug: "the-friends-i-lost-track-of",
  title: "The Friends I Lost Track Of",
  definition: "the count of my friends across school, and that I never understood the fall",
  parents: ["all-about-alan-topic/how-far-behind-i-am-on-people"],
  related: [
    "all-about-alan-topic/why-i-have-to-be-perfect",
    "all-about-alan-topic/who-is-holding-the-rope",
  ],
  settled:
    "I had a great many friends in elementary school. I remember inviting thirty children to a birthday party.\n\nIn middle school I was down to half a dozen or so. I went on a road trip for the first semester of high school, came back, and had one friend left, David Eggerstsen.\n\nI still do not really understand why.\n\nFriendship is the most expressive and least checkable thing there is. Other people's reactions are the one schedule I can never self-check my way to safe. It contracted hardest of all, and a cost with no readable cause is the signature of the thing.",
} as const satisfies AllAboutAlanTopic
