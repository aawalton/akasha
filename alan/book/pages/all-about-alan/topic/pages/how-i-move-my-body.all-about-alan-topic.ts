import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const howIMoveMyBody = {
  id: "01a0c592-84a8-72c1-9b21-f4e189fca45d",
  type: "page-type/all-about-alan-topic",
  slug: "how-i-move-my-body",
  title: "How I Move My Body",
  definition: "the ways I get motion into a day, and what each of them costs",
  parents: ["all-about-alan-topic/health-bar"],
  related: [
    "all-about-alan-topic/the-repeating-i-do-to-settle",
    "all-about-alan-topic/the-four-basics-i-put-first",
  ],
  settled:
    "Moving is the spending and rebuilding arm of putting health first, what eating is on the fuel side.\n\nNo urge starts it. A way of moving comes in and drops out the way a food does, and what I can reach is set by where my safety is.\n\nMoving and being outdoors are one love of mine rather than two. When I am outside I am walking or hiking nine times in ten.\n\nWalking is the lifelong baseline. A usual day is about ten thousand steps and a high one has reached around forty-five thousand. It is the cheapest and most reliable because it is regulation as well as spending.\n\nPacing indoors is the same thing with a lower bottom, for when leaving the room is not on.\n\nStrength work is a coached single set to failure, split across sessions, built so the starting cost and the time cost stay small.\n\nHiking at Rock Canyon and Khyv Peak is the higher-effort outdoor form, affordable in better states.\n\nThe Provo Rec Center is the most expensive venue I have, and waits on a higher safety level.",
} as const satisfies AllAboutAlanTopic
