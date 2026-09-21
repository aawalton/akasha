import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatIDoInBedUntilIAmTired = {
  id: "01a0c5a1-f905-7f6e-ba68-436b36a70e73",
  type: "page-type/all-about-alan-topic",
  slug: "what-i-do-in-bed-until-i-am-tired",
  title: "What I Do In Bed Until I Am Tired",
  definition: "the two things running at once from getting in until sleep takes",
  parents: ["all-about-alan-topic/how-i-fall-asleep"],
  related: [
    "all-about-alan-topic/how-i-actually-breathe",
    "all-about-alan-topic/how-i-keep-light-down",
  ],
  settled:
    "Two things run together once I am in bed, and they run until I am tired enough to sleep.\n\nI read, off a backlit screen, in dark mode, at the lowest brightness it has. That is the opposite of the standard advice about screens, and it fits everything else I know about my own onset: the room does not move it, my resource state does.\n\nThe brightness follows the time of day the same way everywhere, in bed and out of it.\n\nAnd the breathing carries on, four in and twelve out, as it has all day. In bed is one of the places it stacks, because nothing there needs my mouth. There is no talking in bed.",
} as const satisfies AllAboutAlanTopic
