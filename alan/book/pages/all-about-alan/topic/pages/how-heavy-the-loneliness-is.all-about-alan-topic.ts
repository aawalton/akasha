import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const howHeavyTheLonelinessIs = {
  id: "01a0c590-c747-7a97-b5ef-903c3138dd49",
  type: "page-type/all-about-alan-topic",
  slug: "how-heavy-the-loneliness-is",
  title: "How Heavy The Loneliness Is",
  definition: "the weight of being unknown, set against the weight of the load that just left",
  parents: ["all-about-alan-topic/being-alone-at-the-centre"],
  related: [
    "all-about-alan-topic/why-i-stopped-working",
    "all-about-alan-topic/what-loneliness-costs-my-body",
  ],
  settled:
    "It is real and it is manageable, measured against the last twenty years.\n\nIts weight is at least ten times lighter than the weight of having a job.\n\nRetirement did not shrink it. It took the ten-times-heavier load out from under it, and that is where the headroom came from.\n\nA cost that would have crushed me on top of employment is bearable on top of nothing. It is the largest thing I still carry and a tenth the size of the thing that just left.\n\nThat makes this a survivable equilibrium for roughly the first time in two decades.",
} as const satisfies AllAboutAlanTopic
