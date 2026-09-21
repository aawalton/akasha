import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theThreeKindsOfTroubleItCauses = {
  id: "01a0c59c-a014-7586-be75-da99477e4cbb",
  type: "page-type/all-about-alan-topic",
  slug: "the-three-kinds-of-trouble-it-causes",
  title: "The Three Kinds Of Trouble It Causes",
  definition: "sorting every consequence of my wiring by where its repair would have to live",
  parents: ["all-about-alan-topic/being-autistic"],
  related: [
    "all-about-alan-topic/what-comes-with-it",
    "all-about-alan-topic/the-three-seconds-i-am",
    "all-about-alan-topic/what-my-senses-cost-me",
  ],
  settled:
    "I do not treat disability as one thing. There is the wiring, which I love, and there is what the wiring causes, some of which I despise. I can see things nobody else sees and I delight in how different I am. The health problems that ride along with that I hate.\n\nEvery consequence sorts into one of three kinds, and which kind it is rather than how bad it is decides what I would accept doing about it.\n\nPhysical: fix it. Repairing a body does not touch the person. A working joint is not a different me.\n\nSocietal: fix the world. The sensitivity is not a defect. My nervous system is doing exactly what it does, in a world set too loud for it, so the trouble lives in the gap rather than in me.\n\nConceptual: refuse. There is nothing there to repair. Changing it would not give me a better life, it would end the me who would have lived it.\n\nI would not be the same person, to the limited extent that I have identity at all.",
} as const satisfies AllAboutAlanTopic
