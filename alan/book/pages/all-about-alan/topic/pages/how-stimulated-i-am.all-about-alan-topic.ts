import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const howStimulatedIAm = {
  id: "01a06559-9d65-7389-a20b-90c051226f6d",
  type: "page-type/all-about-alan-topic",
  slug: "how-stimulated-i-am",
  title: "How Stimulated I Am",
  definition: "how wound up or how flat I am, which I keep in a band by hand",
  parents: ["all-about-alan-topic/resources"],
  related: [
    "all-about-alan-topic/what-calms-me-down",
    "all-about-alan-topic/how-i-watch-my-agents",
    "all-about-alan-topic/how-warm-i-run",
  ],
  settled:
    "Nothing levels it for me, so I run the loop by hand: a reading, then a knob.\n\nThe knobs are the game, the music and the room light.\n\nWandering focus says I am out of band, and how the wandering feels says which way.\n\nCold means I am overstimulated and hot means I am understimulated.\n\nMy safety level sets how wide the band is, and it is still narrow.\n\nWhether that narrowness is damage still mending or how I was built is not something I can tell from inside. I default to still mending and keep widening it until something proves otherwise.",
} as const satisfies AllAboutAlanTopic
