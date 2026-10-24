import type { Hex } from "akasha/design/interface/color/properties/hex.text-property.types.ts"
import type { LightHex } from "akasha/design/interface/color/properties/light-hex.text-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type Color = Page & {
  title: Title
  hex?: Hex
  lightHex?: LightHex
}
