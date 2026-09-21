import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatIAmInsuredFor = {
  id: "01a0c592-458e-785e-8949-9d5b9916ef5e",
  type: "page-type/all-about-alan-topic",
  slug: "what-i-am-insured-for",
  title: "What I Am Insured For",
  definition: "the cover we carry outside the car and the doctor, and the cover we do not",
  parents: ["all-about-alan-topic/the-money-we-are-living-on"],
  related: [
    "all-about-alan-topic/how-i-grade-an-organisation",
    "all-about-alan-topic/where-our-money-sits",
  ],
  settled:
    "State Farm covers the house, the things in it and our liability on it. It grades D, and the lender requires it for as long as the mortgage runs.\n\nFour million of term life sits on me across two policies, payable to Jen and the household, sized for three children still at home. One is Banner Life. I do not remember the other carrier, or how the four million splits between them.\n\nWe carry no riders on valuables, because nothing we own runs past the household policy's limits.\n\nThe umbrella policy and the long-term care policy are gaps rather than decisions.\n\nNo disability cover, because there is no wage of mine left to replace. No renters cover, because we own the house.",
} as const satisfies AllAboutAlanTopic
