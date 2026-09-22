import type { EsoInterface } from "akasha/code/eso-interface/eso-interface.page-type.types.ts"

export const setsCopyTextDialog = {
  id: "01a0618f-abe0-7d9e-a3bc-aae56b1019a6",
  type: "page-type/eso-interface",
  slug: "sets-copy-text-dialog",
  definition: "the dialog out of which a player copies set text",
  markup: "xml",
  loadedAs: "PC/CopyText/TemperItemsCraftingSets_CopyTextDialog.xml",
} as const satisfies EsoInterface
