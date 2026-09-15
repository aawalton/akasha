import type { RefusalText } from "akasha/check/refusal/properties/refusal-text.text-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type Refusal = Page & {
  title: Title
  text: RefusalText
}
