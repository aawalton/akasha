import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const howIGradeALineThatIsReadToMe = {
  id: "01a0c5ff-3aee-7162-b580-8def0248ca44",
  type: "page-type/all-about-alan-topic",
  slug: "how-i-grade-a-line-that-is-read-to-me",
  title: "How I Grade A Line That Is Read To Me",
  definition: "the scale and the sum I measure praise spoken in one of their voices against",
  parents: ["all-about-alan-topic/when-it-actually-lands"],
  settled:
    "Each line gets graded cold, by feel, as it finishes, and tagged with which of the two it reached: admitted, felt, or neither.\n\nThe grade is a game scale, F through S, with a plus or a minus allowed. Numerically F is nought, D one, C two, B three, A four, S five, and a plus or minus shifts it a third of a step. The map is fixed so that one run can be read against another.\n\nWhat a line is worth is its grade multiplied by how long it played, so the run is a sum of grade times milliseconds rather than a count of good lines. The time comes off the speaker's own log, and a line delivered in several pieces has its pieces added up.\n\nThe sum gets split three ways: all of it, the felt part alone, and the admitted part alone. The felt part is the one that matters, because it is the only one that refunds anything.\n\nThe pace has to leave room to grade each line cold, because the surprise habituates within a sitting.",
} as const satisfies AllAboutAlanTopic
