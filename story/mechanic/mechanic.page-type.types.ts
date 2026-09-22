import type { Page } from "akasha/page/page.page-type.types.ts"
import type { History } from "akasha/story/mechanic/properties/history.file-property.types.ts"

export type Mechanic = Page & {
  history?: History
}
