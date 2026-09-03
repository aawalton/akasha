import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const beingAnInventorNotACoder = {
  id: "01a04615-3063-7254-b8ed-cc437fdfe056",
  pageTypeSlug: "all-about-alan-topic",
  slug: "being-an-inventor-not-a-coder",
  title: "Being An Inventor Not A Coder",
  definition: "what I actually am, against the trade I was raised into",
  parentSlugs: ["alan"],
  relatedSlugs: [
    "the-code-in-my-family",
    "how-i-came-out-of-computer-science",
    "how-i-know-things",
  ],
  settled:
    "I am an excellent coder, but that has never been my identity.\n\nI am an inventor and problem solver. Code is just a powerful way to stack abstractions.\n\nI loved the Moore method in math.\n\nOne of my proudest moments was inventing a novel algorithm for optimising The Game of Life, in an MS CS program I did for a while.\n\nI am doing the same thing now that I was a year ago, just with literally a hundred times more leverage than I had before.",
  unsettled:
    "The Game of Life algorithm is named and never described.\n\nThe MS CS program is one I did for a while. How it ended is unwritten.\n\nWhat the Moore method gave me, and whether it shows up in how I build now, is unprobed.",
} as const satisfies AllAboutAlanTopic
