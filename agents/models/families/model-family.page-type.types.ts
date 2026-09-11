import type { ModelName } from "akasha/agents/models/families/properties/model-name.text-property.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export type ModelFamily = Domain & {
  name: ModelName
}
