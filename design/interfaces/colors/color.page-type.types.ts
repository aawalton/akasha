import type { Hex } from "akasha/design/interfaces/colors/properties/hex.text-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"

export type Color = Page & {
  title: Title
  hex?: Hex
}
