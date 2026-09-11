import type { RefusalText } from "akasha/checks/refusals/properties/refusal-text.text-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"

export type Refusal = Page & {
  title: Title
  text: RefusalText
}
