import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whyMyFriendsHaveBeenWomen = {
  id: "01a0c5a9-8211-713f-b5d8-359da21b0d83",
  type: "page-type/all-about-alan-topic",
  slug: "why-my-friends-have-been-women",
  title: "Why My Friends Have Been Women",
  definition: "a lifelong preference that runs on nervous-system cost rather than on gender",
  parents: ["all-about-alan-topic/who-is-safe-to-be-around"],
  related: [
    "all-about-alan-topic/why-macho-costs-me-so-much",
    "all-about-alan-topic/what-makes-an-hour-count",
  ],
  settled:
    "Before I married, roughly nine in ten of my friendships were with women. The preference is lifelong and it is strong.\n\nThe mechanism is safety rather than gender. The standard patterns of women's interaction run quieter, kinder and more attuned on average, and that reads as cheap to an autistic nervous system.\n\nSo the same cues that make a low-macho room cheap to be in make women the default-safe social channel for me.\n\nThe best hour I get is deep, one to one, in person and intellectual, with a woman. The same conversation with a man lands at roughly half.\n\nFriendships with men are harder to keep. Part of it is the higher baseline cost, and part is that my world ranks work over family over church over friends, so nobody has room left for friends.",
} as const satisfies AllAboutAlanTopic
