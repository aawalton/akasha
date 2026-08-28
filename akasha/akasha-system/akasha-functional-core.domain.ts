import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const akashaFunctionalCore = {
  id: "01a049e9-651d-7004-9075-d53b697b710a",
  slug: "akasha-functional-core",
  definition: "the smallest part of the new system that can run itself",
  intent: [
    "The akasha system defines itself.",
    "The akasha system is written as akasha pages.",
    "The akasha system answers every read of itself.",
    "The akasha system makes every change to itself.",
    "The akasha system checks every change to itself.",
  ],
} as const satisfies Domain
