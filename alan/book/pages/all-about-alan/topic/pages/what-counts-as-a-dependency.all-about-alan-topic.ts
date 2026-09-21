import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatCountsAsADependency = {
  id: "01a0c5a3-4830-7eeb-a0a4-a1faac310146",
  type: "page-type/all-about-alan-topic",
  slug: "what-counts-as-a-dependency",
  title: "What Counts As A Dependency",
  definition: "the line I draw around what goes on the list at all",
  parents: ["all-about-alan-topic/getting-out-from-under-a-dependency"],
  related: ["all-about-alan-topic/trusting-a-person-not-an-institution"],
  settled:
    "Anything ongoing with a large organisation where leaving would cost me something real in money, time, learning or coordination. Paid or free, a company or a government, obvious or not.\n\nI set the line wide on purpose. Narrow the list early and the ones that matter most are exactly the ones that hide.\n\nA single purchase I will not repeat does not count. Nor does something recurring I could swap for nothing, like whichever shop happens to be nearest.\n\nNor, strictly, does a relationship with a person. My test was built for large organisations under profit pressure, and a person runs on different forces.\n\nThat last line has a rough edge. My doctor and my accountant are individuals, and the dependency has the same shape as any other. For now I list them anyway and leave the boundary to sharpen later.",
} as const satisfies AllAboutAlanTopic
