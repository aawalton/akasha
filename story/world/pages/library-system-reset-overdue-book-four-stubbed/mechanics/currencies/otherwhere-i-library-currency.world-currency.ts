import type { WorldCurrency } from "akasha/story/world/mechanics/currencies/world-currency.page-type.types.ts"

export const otherwhereILibraryCurrency = {
  id: "01a0f1e9-e51d-7330-a645-040ae5079a54",
  type: "page-type/world-currency",
  slug: "otherwhere-i-library-currency",
  title: "Universal Library Currency",
  world: "world/library-system-reset-overdue-book-four-stubbed",
  description: "The currency a Library account holds.",
} as const satisfies WorldCurrency
