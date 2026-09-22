import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatChargesTheMaking = {
  id: "01a0c5ec-9b32-743b-a18c-73934ff48f66",
  type: "page-type/all-about-alan-topic",
  slug: "what-charges-the-making",
  title: "What Charges The Making",
  definition: "which of two roots actually makes creative work dangerous, and how I tested it",
  parents: ["all-about-alan-topic/why-making-things-hurts"],
  related: [
    "all-about-alan-topic/why-i-have-to-be-perfect",
    "all-about-alan-topic/what-it-costs-someone-to-know-me",
  ],
  settled:
    "Two roots both predicted that making would get amputated, and they were different roots.\n\nThe first is verifiability, and it is the one that holds. Getting it right was how I bought safety from punishment, so what I cannot check myself against stays dangerous. Open creative work has no right answer and no bug to blame, so the verdict on it is never forecastable.\n\nThe second was self-exposure: that making puts the unreadable me on display, and that is what got punished. I tested it and it does not hold. I am not at all afraid of having other people see my unreadable self.\n\nThe test that told them apart: when the alarm fires on something I am making, before any judgment has arrived, it is recoiling from the unpredictability of the reception, not from the exposure.\n\nThe earliest scars I can see are an art class and a writing class at about twelve, on different creative surfaces. They landed on a system already a dozen years illegible, so red ink read as danger rather than feedback.",
} as const satisfies AllAboutAlanTopic
