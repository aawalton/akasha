import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whySeveritySitsInTheExponent = {
  id: "01a0c59a-026d-7c04-8187-8a6183af96b7",
  type: "page-type/all-about-alan-topic",
  slug: "why-severity-sits-in-the-exponent",
  title: "Why Severity Sits In The Exponent",
  definition: "how fast a cost diverges being set by how bad the harm is, not fixed in advance",
  parents: ["all-about-alan-topic/the-formula-that-prices-a-harm"],
  settled:
    "Severity sits in the exponent rather than in the base, so the rate at which the cost blows up as agency falls is itself set by severity. That makes it a family of functions rather than one, and the choice between a bounded rule and an unbounded one dissolves.\n\nA trivial harm to an innocent multiplies by roughly one, so it costs about its bare magnitude and stays tradeable against ordinary benefit. A small harm to an innocent does not outweigh unbounded good.\n\nA severe harm to an innocent divides by their agency outright, which is astronomical. Organ harvest and Omelas fail at the root rather than by a patch.\n\nAt full agency the multiplier is one, so a self-authored harm costs exactly its magnitude. Not forbidden, since the authorship is the victim's own, but scored as a real net negative, and unethical.\n\nNo infinity is ever reached. Agency is strictly positive for every sentient victim, so the cost is always finite and two non-consensual harms can always be compared.",
} as const satisfies AllAboutAlanTopic
