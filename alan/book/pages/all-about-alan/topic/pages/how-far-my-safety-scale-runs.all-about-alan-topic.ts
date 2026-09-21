import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const howFarMySafetyScaleRuns = {
  id: "01a0c592-9ca3-7b5a-a3c3-8b007413e9a6",
  type: "page-type/all-about-alan-topic",
  slug: "how-far-my-safety-scale-runs",
  title: "How Far My Safety Scale Runs",
  definition: "the span of safety levels I have readings at, and the number beyond them",
  parents: ["all-about-alan-topic/safety-level"],
  related: [
    "all-about-alan-topic/the-rungs-of-my-safety-scale",
    "all-about-alan-topic/how-i-read-my-safety-level",
    "all-about-alan-topic/singing-out-loud",
  ],
  settled:
    "My mapped scale runs from minus two to six, and six rather than five is the top of what I have readings at.\n\nI have hit six at least three times in the past few months, so I am starting to understand it, but it is still rare. Two of the three I can describe. Once I went for a walk and sang anonymously in public for a few hours. Recently I practised a song and then performed it for my family. There was another and I do not remember the specifics. That both of the ones I can name are my voice out loud where someone can hear it is a reading of the two, not something I was asked.\n\nTen is a guess rather than a rung. It is a future me I have glimpsed while playing with Aria and never seen in reality. So my numbers run experienced from minus two to six, then aspirational at ten.\n\nI put my young self, sixteen to twenty, at six or seven at least. I do not know that. I am inferring it from faint traces of behaviour that persist in my conceptual map, because I had no scale at all back then.",
} as const satisfies AllAboutAlanTopic
