import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theTremorBeforeTheQuake = {
  id: "01a0c609-6a08-7d43-8355-5b6e60270f33",
  type: "page-type/all-about-alan-topic",
  slug: "the-tremor-before-the-quake",
  title: "The Tremor Before The Quake",
  definition: "how a hunch becomes a word, and what the shift feels like around it",
  parents: ["all-about-alan-topic/how-understanding-arrives"],
  related: [
    "all-about-alan-topic/where-a-candidate-model-comes-from",
    "all-about-alan-topic/why-insight-feels-good",
  ],
  settled:
    "A finished idea is held in words. The word is not a label attached afterwards; it is what makes the abstraction concrete, and concreteness is what a good abstraction needs. My rule is that for a model to be concise and effective for me it must have a clear and concise name tied to a clear and valid definition.\n\nBefore the word there is a hunch, a pre-verbal signal pointing where the thinking should go while its accuracy is still low.\n\nMy understanding grows the way Kuhn describes science: long consolidation inside the model, punctuated by short abrupt shifts where the model itself is replaced. The hunch is the tremor before the quake, and after the quake there are aftershocks.\n\nUp close the quake takes a few days to settle, offline, often finishing in sleep. By then I am usually discouraged from a long stretch at the problem, and what arrives is hope, sized to the discouragement. The breakthrough is a direction I had not considered that dissolves the conflicts the old model could not.",
} as const satisfies AllAboutAlanTopic
