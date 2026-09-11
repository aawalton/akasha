import type { MonarchId } from "akasha/alan/harness/monarch/records/properties/monarch-id.text-property.types.ts"
import type { Definition } from "akasha/domains/properties/definition.standard-agent-english-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.ts"

export type MonarchRecord = Page & {
  title: Title
  monarchId?: MonarchId
  definition?: Definition
}
