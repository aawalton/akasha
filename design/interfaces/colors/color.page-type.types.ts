import type { Hex } from "akasha/design/interfaces/colors/properties/hex.text-property.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.ts"

export type Color = Page & {
  title: Title
  hex?: Hex
}
