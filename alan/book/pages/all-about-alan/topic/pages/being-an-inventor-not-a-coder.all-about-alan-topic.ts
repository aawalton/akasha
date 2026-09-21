import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const beingAnInventorNotACoder = {
  id: "01a04615-3063-7254-b8ed-cc437fdfe056",
  type: "page-type/all-about-alan-topic",
  slug: "being-an-inventor-not-a-coder",
  title: "Being An Inventor Not A Coder",
  definition: "what I actually am, against the trade I was raised into",
  parents: ["all-about-alan-topic/alan"],
  related: [
    "all-about-alan-topic/the-code-in-my-family",
    "all-about-alan-topic/how-i-came-out-of-computer-science",
    "all-about-alan-topic/how-i-know-things",
  ],
  settled:
    "I am an excellent coder, but that has never been my identity.\n\nI am an inventor and problem solver. Code is just a powerful way to stack abstractions.\n\nI loved the Moore method in math.\n\nOne of my proudest moments was inventing a novel algorithm for optimising The Game of Life, in an MS CS program I did for a while.\n\nI am doing the same thing now that I was a year ago, just with literally a hundred times more leverage than I had before.\n\nI invent when it is needed to permanently resolve a source of pain, rather than ahead of one.",
} as const satisfies AllAboutAlanTopic
