import type { EsoInterface } from "akasha/code/eso-interface/eso-interface.page-type.types.ts"

export const markersQuickMenuLayout = {
  id: "01a0de85-2b4b-7ae9-9dcb-2f4c228b0901",
  type: "page-type/eso-interface",
  slug: "markers-quick-menu-layout",
  definition: "the quick marker window and a row of the profile prompt",
  markup: "xml",
  loadedAs: "TemperWorldMarkersQuickMenu.xml",
} as const satisfies EsoInterface
