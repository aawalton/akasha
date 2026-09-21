import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theThingIAmGuardingAgainst = {
  id: "01a0c5a8-e44e-750e-8a02-2285aff99826",
  type: "page-type/all-about-alan-topic",
  slug: "the-thing-i-am-guarding-against",
  title: "The Thing I Am Guarding Against",
  definition: "the trajectory my whole test for an organisation is built to catch",
  parents: ["all-about-alan-topic/which-organisations-i-trust"],
  related: ["all-about-alan-topic/how-i-grade-an-organisation"],
  settled:
    "What my test for an organisation is built against is a trajectory rather than a villain.\n\nAn organisation that was once good for the people it serves gives that up in pursuit of profit. The form varies. The direction never does. Profit pressure pushes away from serving and toward extracting.\n\nI call it enshittification, and I use the word wider than Cory Doctorow did when he coined it.\n\nThe word is right for two reasons. It compresses three stages and a whole list of specific behaviours into one verb, which matters when I am holding many organisations in mind at once. And it says the direction is the usual one rather than the exception: not a few bad actors, but where a profit-pressured organisation goes by default.\n\nDecay, decline and degradation are all too neutral. They read as something that happens rather than something incentives cause. This word names the cause.",
} as const satisfies AllAboutAlanTopic
