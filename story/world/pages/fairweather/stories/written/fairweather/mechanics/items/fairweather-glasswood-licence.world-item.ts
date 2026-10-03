import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const fairweatherGlasswoodLicence = {
  id: "01a10326-1ad8-7884-8c86-93150ff8c79d",
  type: "page-type/world-item",
  slug: "fairweather-glasswood-licence",
  title: "Glasswood Licence",
  world: "world/fairweather",
  description:
    "A stamped guild paper licensing one party into the Glasswood's edge for a day and a night, its members' names written on it.",
} as const satisfies WorldItem
