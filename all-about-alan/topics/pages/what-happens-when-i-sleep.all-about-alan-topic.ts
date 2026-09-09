import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.types.ts"

export const whatHappensWhenISleep = {
  id: "01a06559-9d65-7648-9913-f37e803dcd34",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "what-happens-when-i-sleep",
  title: "What Happens When I Sleep",
  definition: "the one state where the whole machine runs, senses and feelings and all",
  parents: ["sleep"],
  related: ["how-i-read-myself", "the-pictures-at-the-edge-of-sleep"],
  settled:
    "Asleep I get novel-length stories, half a dozen characters, full settings, and an emotional score under them.\n\nThat is the proof the break is at recall and nowhere earlier. The parts that build it are all there.\n\nMore of my cortisol at bedtime means more nightmares. That is the whole of what I claim.\n\nI have gone through phases of writing them down on waking, as story ideas.",
} as const satisfies AllAboutAlanTopic
