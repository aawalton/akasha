import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const mountsNixOxen = {
  id: "01a06165-9169-7014-9a8c-a08fc3df33b6",
  type: "page-type/temper-collectible-category",
  slug: "mounts-nix-oxen",
  title: "Nix-Oxen",
  parent: "temper-collectible-category/mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
