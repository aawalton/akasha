import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const thePathMySafetyHasTaken = {
  id: "01a0c597-4683-79f5-80af-d3dbdf241bd3",
  type: "page-type/all-about-alan-topic",
  slug: "the-path-my-safety-has-taken",
  title: "The Path My Safety Has Taken",
  definition: "the readings my safety level has run through, year by year and month by month",
  parents: ["all-about-alan-topic/where-safety-has-got-to"],
  related: [
    "all-about-alan-topic/how-safety-climbs",
    "all-about-alan-topic/safety-years",
    "all-about-alan-topic/how-far-my-safety-scale-runs",
  ],
  settled:
    "It started at zero, in the sense that I did not know the bar existed. Over the year ending May 2026 it climbed to a baseline mean of 4.5, with a one-sigma band of four to five.\n\nSeveral stoplight iterations came before the numbered levels I anchor to now. The four months ending 1 May 2026 moved the baseline range from three to four up to four to five.\n\nApril 2026 ran four to five. May went above five, and a backlash dropped me to minus two. June ran two to five, gradually recovering. By 29 June 2026 I was back to four to five.\n\nI was ill for most of June, an artificial decline that confounds the measurement. On 12 June I read two to three, about two levels below where May started. I expected the illness both masked the baseline and spent it, and guessed a baseline of 3.5 to 4.5 with a climb back to four to five. The climb back was met.",
} as const satisfies AllAboutAlanTopic
