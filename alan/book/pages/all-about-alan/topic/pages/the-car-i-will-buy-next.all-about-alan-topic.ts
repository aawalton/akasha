import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theCarIWillBuyNext = {
  id: "01a0c59b-adbf-7088-8da2-d47c4dd55000",
  type: "page-type/all-about-alan-topic",
  slug: "the-car-i-will-buy-next",
  title: "The Car I Will Buy Next",
  definition: "three steps from the car we have to needing no fuel and no charger",
  parents: ["all-about-alan-topic/the-only-car-we-own"],
  related: ["all-about-alan-topic/getting-out-from-under-a-dependency"],
  settled:
    "Three steps in order, each waiting on something outside me. The aim is not a better-graded fuel vendor or a better-graded insurer. It is needing neither.\n\nFirst, wait. Three-year leases are expiring and a wave of used electric cars is coming onto the market. The right action for now is keeping the Odyssey running and getting ready. Buying new at full price, or the wrong used one before the market's shape is clear, spends the capital twice.\n\nThen buy, choosing on durability and maintainability.\n\nThen put enough solar on the roof to need neither a fuel station nor a public charger. Without that last step the change only swaps a fuel dependency for a grid one, and the city power company takes the place of the fuel vendor.",
} as const satisfies AllAboutAlanTopic
