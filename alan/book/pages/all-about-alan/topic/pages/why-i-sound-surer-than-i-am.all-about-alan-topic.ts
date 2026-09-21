import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whyISoundSurerThanIAm = {
  id: "01a0c606-9604-7ddc-9889-ec75296c49ce",
  type: "page-type/all-about-alan-topic",
  slug: "why-i-sound-surer-than-i-am",
  title: "Why I Sound Surer Than I Am",
  definition: "the gap between the confidence my phrasing projects and the confidence I hold",
  parents: ["all-about-alan-topic/how-i-come-across"],
  related: ["all-about-alan-topic/how-i-know-things", "all-about-alan-topic/why-i-act-fast"],
  settled:
    "People routinely read me as more certain than I am. The surface form, X is Y, sound is roughly five times louder for me, reads to a listener as about 95% confidence. My actual confidence per claim is closer to 70 to 80%, and a separate global discount sits on top: at least half of what I believe is false.\n\nOnly one of the two layers is visible. The flat phrasing is what a listener hears. The half-wrong stance changes how readily I update, not how I phrase anything, so nobody can read it off my speech.\n\nThey get about 95 and my effective confidence is nearer 35 to 40, a gap of roughly fifty to sixty points rather than the fifteen to twenty-five the phrasing alone would explain.",
} as const satisfies AllAboutAlanTopic
