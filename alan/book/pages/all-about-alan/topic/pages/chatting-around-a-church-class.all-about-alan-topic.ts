import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const chattingAroundAChurchClass = {
  id: "01a11d01-6a48-76db-9e86-4154d43cfd9f",
  type: "page-type/all-about-alan-topic",
  slug: "chatting-around-a-church-class",
  title: "Chatting Around A Church Class",
  definition: "the short talks I have with someone just after or before a class at church",
  parents: ["all-about-alan-topic/how-i-practise-my-faith"],
  related: [
    "all-about-alan-topic/being-known",
    "all-about-alan-topic/why-a-familiar-face-costs-more",
  ],
  settled:
    "Usually it is after class, sometimes before. I tend to enjoy it.\n\nThe chats tend to be casual, with one other person or at most two. Sometimes they are about the lesson, but usually they are just catching up.\n\nCatching up is usually people asking me about my life. I try to ask questions too, but I am not great at that, so it is still not small talk generally.\n\nThere is a best-behaviour effect at church as well.\n\nIt does feel like a deposit, though a small one.",
  createdAt: "2026-10-08T19:33:14.439Z",
  updatedAt: "2026-10-08T19:33:14.439Z",
} as const satisfies AllAboutAlanTopic
