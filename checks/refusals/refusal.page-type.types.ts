import type { Page } from "../../pages/page.page-type.types.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { RefusalText } from "./properties/refusal-text.text-property.ts"

export type Refusal = Page & {
  title: Title
  text: RefusalText
}
