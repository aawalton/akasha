import type { HeldAddon } from "akasha/code/held-addon/held-addon.page-type.types.ts"

export const libMediaProvider = {
  id: "01a081a4-306a-7689-8945-d085a36c0f92",
  type: "page-type/held-addon",
  slug: "lib-media-provider",
  addonName: "LibMediaProvider",
  esoAddon: "temper-addon/temper-lib-media-provider",
  addonKind: "library",
  heldBy: 13249,
  tiClean: true,
} as const satisfies HeldAddon
