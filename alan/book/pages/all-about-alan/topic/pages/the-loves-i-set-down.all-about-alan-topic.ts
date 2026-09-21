import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theLovesISetDown = {
  id: "01a0c5a0-bf86-7a7e-8d3b-50520ab60fea",
  type: "page-type/all-about-alan-topic",
  slug: "the-loves-i-set-down",
  title: "The Loves I Set Down",
  definition: "choosing between what I loved and surviving, and which one won every time",
  parents: ["all-about-alan-topic/why-i-have-to-be-perfect"],
  related: [
    "all-about-alan-topic/being-alone-on-purpose",
    "all-about-alan-topic/how-far-behind-i-am-on-people",
  ],
  settled:
    "I have lost everything I loved that could not be made safe. I had to choose between the things I loved and surviving, and survivorship bias shows that I chose survival every time.\n\nWhat I set down I never stopped loving. The wanting is still there under the scar, which is how I know it was love rather than preference.\n\nWhat is left is not the safe loves. It is the survivors, and survivors always make the cost look smaller than it was, because the ones who paid it are not in the room to be counted.\n\nTwo lines run the survival side. I will change anything and sacrifice anything I need to in order to survive. And if this fails, it will not be because I could have done more.\n\nThe second keeps the guard off my back. I cannot control a random outcome, so I make the failure never mine. Effort is the one thing I am allowed to keep perfect.",
} as const satisfies AllAboutAlanTopic
