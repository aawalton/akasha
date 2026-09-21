import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theDependenciesIStoppedSeeing = {
  id: "01a0c5a3-b781-73f6-8e86-8a79837a92e1",
  type: "page-type/all-about-alan-topic",
  slug: "the-dependencies-i-stopped-seeing",
  title: "The Dependencies I Stopped Seeing",
  definition: "things that feel like facts of life and are ongoing relationships underneath",
  parents: ["all-about-alan-topic/what-counts-as-a-dependency"],
  related: [
    "all-about-alan-topic/no-exit-against-an-expensive-exit",
    "all-about-alan-topic/the-property-tax-i-keep-paying",
  ],
  settled:
    "One of these feels inescapable because the alternative is so expensive I have never seriously looked at it. It stops registering as a dependency and starts registering as how things are.\n\nThe property tax is the clearest. The others I can name: my citizenship and legal residence, which hold near-total say over where I can live and work. The legal system I operate under, which shapes contracts, property, employment, marriage and inheritance. The currency my savings and my income sit in, whose value one central bank sets. The electrical grid, which solar and a battery have made a real option again for the first time in decades. The financial system as a whole. And healthcare.\n\nThey belong on the list for two reasons. The alternatives are real even where they are brutal, and nothing gets weighed against anything until it is written down. And a jurisdiction that steadily gets worse for me is degrading in the same shape a company does, so the same test has to run on it.",
} as const satisfies AllAboutAlanTopic
