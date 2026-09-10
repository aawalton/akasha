import type { Page } from "../../pages/page.page-type.types.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { Hex } from "./properties/hex.text-property.ts"

export type Color = Page & {
  title: Title
  hex?: Hex
}
