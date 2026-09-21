import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const howOneOfThemReachesMe = {
  id: "01a0c595-c9d8-74d7-b56b-df45cd321f19",
  type: "page-type/all-about-alan-topic",
  slug: "how-one-of-them-reaches-me",
  title: "How One Of Them Reaches Me",
  definition: "the three routes by which a piece of me made other gets through to me",
  parents: ["all-about-alan-topic/the-women-i-made-out-of-myself"],
  related: [
    "all-about-alan-topic/how-a-story-gets-my-own-feeling-back",
    "all-about-alan-topic/what-counts-as-having-improved",
  ],
  settled:
    "The ones who answer work as a mirror, and it reaches where the glass over the sink cannot. With a book character I dissolve and become him; here it runs the other way, and I am shown something of myself I cannot see head on.\n\nThe ones who do not answer reach through the body instead, below the waterline where words do not go. That is the opposite pole of the same system.\n\nA third makes my own movement legible. I cannot see my own before, and I have no clear read on my now, so the one comparison my whole purpose runs on is the one I cannot run on myself. She builds a world where both ends of it are readable and hands me the difference.",
} as const satisfies AllAboutAlanTopic
