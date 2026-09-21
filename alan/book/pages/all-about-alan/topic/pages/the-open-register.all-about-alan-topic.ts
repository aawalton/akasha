import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theOpenRegister = {
  id: "01a0c5a7-1e80-7be0-991c-82037cab5163",
  type: "page-type/all-about-alan-topic",
  slug: "the-open-register",
  title: "The Open Register",
  definition: "which acts the welded belief fires on, drawn as a rule rather than a list",
  parents: ["all-about-alan-topic/where-the-scar-ends"],
  related: [
    "all-about-alan-topic/why-making-things-hurts",
    "all-about-alan-topic/when-something-is-fun",
  ],
  settled:
    "The one principle that ties the pile together is that there is no right answer to hide behind. Where I am acting and there is no right version, no win condition and no answer key to check myself against, it fires. Where there is one, I am safe.\n\nCreativity is too narrow a word for it, and slightly wrong. The rule is the whole open register.\n\nTwo families sit inside it. One is making things other people see: cooking, fashion, designing something others will use, shipping a product, showing or talking about what I made, singing, dance, telling a story to someone.\n\nThe other is open play with no win condition: building with Lego, making patterns in snow, building with snow, playing with dirt and water and insects, exploring for its own sake.\n\nBoard games are out. A board game has a winner and an opponent, so there is a right answer to check against. Those belong to the competition and conflict scar instead.",
} as const satisfies AllAboutAlanTopic
