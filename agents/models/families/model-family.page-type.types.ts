import type { Domain } from "../../../domains/domain.page-type.types.ts"
import type { ModelName } from "./properties/model-name.text-property.ts"

export type ModelFamily = Domain & {
  name: ModelName
}
