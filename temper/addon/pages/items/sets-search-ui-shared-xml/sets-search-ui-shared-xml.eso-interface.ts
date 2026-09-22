import type { EsoInterface } from "akasha/code/eso-interface/eso-interface.page-type.types.ts"

export const setsSearchUiSharedXml = {
  id: "01a0618f-abe1-7489-996e-bbc414aca800",
  type: "page-type/eso-interface",
  slug: "sets-search-ui-shared-xml",
  definition: "the controls the set search window shares between keyboard and gamepad",
  markup: "xml",
  loadedAs: "SearchUI/TemperItemsCraftingSets_SearchUI_Shared.xml",
} as const satisfies EsoInterface
