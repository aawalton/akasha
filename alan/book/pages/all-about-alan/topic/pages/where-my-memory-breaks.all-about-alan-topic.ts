import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whereMyMemoryBreaks = {
  id: "01a0c58d-9c60-7e64-88d2-6f7b4e9c31d1",
  type: "page-type/all-about-alan-topic",
  slug: "where-my-memory-breaks",
  title: "Where My Memory Breaks",
  definition: "which of the three stages of remembering is the one that fails in me",
  parents: ["all-about-alan-topic/what-i-cannot-play-forward"],
  related: [
    "all-about-alan-topic/what-happens-when-i-sleep",
    "all-about-alan-topic/the-feeling-i-cannot-get-at",
  ],
  settled:
    "Remembering runs in three stages: taking a thing in, writing it down, and calling it back. Only the third of mine is broken.\n\nThe dreams are the proof. If the senses and the feeling are all there asleep, they were taken in and they were written down.\n\nSo nothing is lost. It is written, and while I am awake there is no path back to it.\n\nTotal means every channel: sight, sound, touch, smell, taste, where my limbs are, what my body is doing, and feeling.\n\nAn emotion is encoded as it happens, the same as anybody's. What I cannot do is call it back and work it off, so it banks up behind the break.",
} as const satisfies AllAboutAlanTopic
