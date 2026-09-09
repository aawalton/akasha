import type { AllAboutAlanQuestion } from "../all-about-alan-question.page-type.ts"

export const whetherMyColourBandsRideARollingSigma = {
  id: "01a077e2-b832-70fa-8d1d-163fa8f0247c",
  pageTypeSlug: "all-about-alan-question",
  type: "all-about-alan-question",
  slug: "whether-my-colour-bands-ride-a-rolling-sigma",
  topic: "the-colours-i-read-myself-in",
  ask: "Is the sigma behind my colour bands computed over a long baseline or a rolling recent window, so that the alarm bands either hold still while a slide runs or drift down with the slide?",
} as const satisfies AllAboutAlanQuestion
