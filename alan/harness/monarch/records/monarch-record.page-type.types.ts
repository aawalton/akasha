import type { Definition } from "../../../../domains/properties/definition.standard-agent-english-property.ts"
import type { Page } from "../../../../pages/page.page-type.types.ts"
import type { Title } from "../../../../pages/properties/title.text-property.ts"
import type { MonarchId } from "./properties/monarch-id.text-property.ts"

export type MonarchRecord = Page & {
  title: Title
  monarchId?: MonarchId
  definition?: Definition
}
