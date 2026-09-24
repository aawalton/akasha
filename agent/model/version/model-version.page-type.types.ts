import type { ModelFamily } from "akasha/agent/model/test/properties/model-family.relation-property.types.ts"
import type { ModelId } from "akasha/agent/model/version/properties/model-id.text-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type ModelVersion = Page & {
  modelId: ModelId
  modelFamily: ModelFamily
  title: Title
}
