import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theTwoHalvesOfImprovingMe = {
  id: "01a0c593-65ad-7edb-ba5f-8a9dc0780276",
  type: "page-type/all-about-alan-topic",
  slug: "the-two-halves-of-improving-me",
  title: "The Two Halves Of Improving Me",
  definition: "conceptual improving beside health movement, and why the two are not equal",
  parents: ["all-about-alan-topic/self-improvement"],
  related: [
    "all-about-alan-topic/the-three-parts-of-me",
    "all-about-alan-topic/what-i-value-in-order",
  ],
  settled:
    "Improving me splits the way I split. Four fifths of it is the conceptual map and one fifth is the physical and emotional side.\n\nThe conceptual side improves by making the model truer. There is no separate getting-better-at-thinking beside that; here the two are one act.\n\nThe physical side improves by its own tools, the breathing and the baths, which do not run on truth at all. Connected, not identical.\n\nConceptual improving has a clear absolute direction, accumulates only upward, and lasts. Health movement has no direction that clear and I do not expect it to be monotonic. It washes in and out rather than piling up, and it is pinned to the present.\n\nHealth still earns its place. It sets how far I can climb toward truth at all, and it lets each immediate me enjoy being alive now. Both are in service, where truth-movement is the thing itself, so health is weaker in purpose and ranked below.",
} as const satisfies AllAboutAlanTopic
