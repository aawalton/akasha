import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatElseIsOnTheList = {
  id: "01a0c591-6149-7cd2-b18f-05e3d23b1468",
  type: "page-type/all-about-alan-topic",
  slug: "what-else-is-on-the-list",
  title: "What Else Is On The List",
  definition: "the rest of the usual candidates, checked one by one against me",
  parents: ["all-about-alan-topic/what-comes-with-it"],
  related: [
    "all-about-alan-topic/sleep",
    "all-about-alan-topic/how-i-eat",
    "all-about-alan-topic/having-adhd",
  ],
  settled:
    "Sleep is hard sometimes rather than constantly or severely.\n\nOCD is there and mild.\n\nEating leans a little toward ARFID, and my medication flattens appetite on top of that, so there are stretches where I simply do not eat. It is not about my body or about restricting.\n\nTrauma encoding applies across several dimensions at once.\n\nHypermobility is my mother's diagnosis rather than mine, and I have never noticed it in myself. It is worth flagging anyway, given how often it turns up alongside autism.\n\nADHD is on every clinical version of this list. I treat it as a neurotype of its own instead, and how often the two turn up together is itself a hint about mechanism.",
} as const satisfies AllAboutAlanTopic
