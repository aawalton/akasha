import type { EsoInterface } from "akasha/code/eso-interface/eso-interface.page-type.types.ts"

export const tweakVirtuals = {
  id: "01a06115-1abe-74cb-ab20-23f7d08ea7af",
  type: "page-type/eso-interface",
  slug: "tweak-virtuals",
  definition: "the virtual controls from which the interface add-on builds its own buttons",
  markup: "xml",
  loadedAs: "XML/TweakVirtuals.xml",
} as const satisfies EsoInterface
