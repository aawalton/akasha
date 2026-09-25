import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const basicProvisioningGuide = {
  id: "01a0d5e6-c6d4-7f8d-ae67-9c3b6eb2499b",
  type: "page-type/temper-lore-book",
  slug: "basic-provisioning-guide",
  title: "Basic Provisioning Guide",
  collection: "temper-lore-collection/crafting-books",
  bookIndex: 20,
} as const satisfies TemperLoreBook
