import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whyThisIsNotQuiteAnAddiction = {
  id: "01a0c596-d933-7aef-beeb-24aa5f83da25",
  type: "page-type/all-about-alan-topic",
  slug: "why-this-is-not-quite-an-addiction",
  title: "Why This Is Not Quite An Addiction",
  definition: "how close the behaviour comes to an addiction, and the three ways it does not",
  parents: ["all-about-alan-topic/why-i-could-never-quit"],
  related: ["all-about-alan-topic/how-far-behind-i-am-on-people"],
  settled:
    "I am seventy percent convinced that the opposite of addiction is connection rather than sobriety. Addiction takes hold in mammals mainly where social needs go unmet, as a poor substitute for a real lack. My social needs have almost never been met, so it would be surprising if I had no addiction at all.\n\nMechanically it does not look like one. The dose has never escalated. No attachment to the activity has compounded. It vanishes when it is not needed: a short targeted use, and then it disappears from my life the way every other experience does, with no stored craving to ache against in between.\n\nSo the consequences are far milder than a typical addiction. A short, targeted, non-escalating intervention that leaves no residue is a different object from a compounding dependency, even where the connection deficit it grows out of is the same root.",
} as const satisfies AllAboutAlanTopic
