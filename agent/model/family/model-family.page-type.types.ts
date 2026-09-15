import type { ModelName } from "akasha/agent/model/family/properties/model-name.text-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export type ModelFamily = Domain & {
  name: ModelName
}
