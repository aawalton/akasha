import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const howMuchOfAHarmSomeoneAuthored = {
  id: "01a0c598-01b5-7ef6-8f16-06e4214feb94",
  type: "page-type/all-about-alan-topic",
  slug: "how-much-of-a-harm-someone-authored",
  title: "How Much Of A Harm Someone Authored",
  definition: "agency as an individual's share of the causal magnitude of their own value stream",
  parents: ["all-about-alan-topic/the-ethics-i-worked-out"],
  related: ["all-about-alan-topic/the-line-a-being-crosses-to-count"],
  settled:
    "Agency is an individual's share of the causal magnitude of their own value stream. I read that stream as the payoff of a cooperative game whose players are every agent there is, and agency is their attribution over the total of all the magnitudes. It runs from zero to one, and it can be taken over a whole life, one domain, one event, or a single harm.\n\nEvery sentient being has strictly positive agency, and I derive that rather than assume it. Sentience is self-maintained organisation, and anything that can causally maintain itself can causally fail to, so before any harm there was always a path of nonzero probability, its own cessation, on which that harm never reaches it. It is never a null player in the game about its own harm.\n\nThe agency can be tiny. A newborn has few such paths and an adult many. Zero is kept for things that are not sentient, and no weighted victim ever sits there.",
} as const satisfies AllAboutAlanTopic
