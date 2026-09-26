import type { EsoInterface } from "akasha/code/eso-interface/eso-interface.page-type.types.ts"

export const markersLayout = {
  id: "01a0de85-2b4a-798b-ad58-ae0396a0e56f",
  type: "page-type/eso-interface",
  slug: "markers-layout",
  definition: "the markers drawn in the world, their camera and the share progress window",
  markup: "xml",
  loadedAs: "TemperWorldMarkers.xml",
} as const satisfies EsoInterface
