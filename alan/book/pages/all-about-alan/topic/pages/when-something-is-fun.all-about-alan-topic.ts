import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whenSomethingIsFun = {
  id: "01a06559-9d65-7462-a879-a80a8c5a35f4",
  type: "page-type/all-about-alan-topic",
  slug: "when-something-is-fun",
  title: "When Something Is Fun",
  definition: "what decides whether an activity is fun, and the two stages of it",
  parents: ["all-about-alan-topic/playing-again"],
  related: [
    "all-about-alan-topic/what-i-do-when-i-am-past-bearing",
    "all-about-alan-topic/letting-a-feeling-in-through-a-story",
  ],
  settled:
    "Fun is doing a thing as the thing. A use it also has is fine; doing it for that use kills it.\n\nI hold one thing at a time, so a purpose I am doing it for takes the room the activity needed.\n\nIt comes in two stages: full focus, which I get even at the bottom, and enjoyment on top, which needs safety at three.\n\nTwenty years ran on the first alone. It mostly served instead as distraction with occasional highlights. Twelve thousand hours in one game is what that was.\n\nThe room never sits empty. If I do not fill it on purpose the loudest thing fills it for me, and in the dark years that was the load. So the focus is not recreation, it is keeping the pain out of the only room I have, and the relief is by eviction rather than by yield.\n\nBeing made to do a thing rules fun out, but being free to choose does not rule it in. Learning to enable a piece of work is not fun; learning for its own sake is.\n\nI cannot set which way it points. I read why I started, rather than setting it.",
} as const satisfies AllAboutAlanTopic
