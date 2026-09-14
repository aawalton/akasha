import type { ApiBase } from "akasha/agent/model/providers/properties/api-base.url-property.types.ts"
import type { ApiKey } from "akasha/agent/model/providers/properties/api-key.text-property.types.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export type ModelProvider = Domain & {
  apiBase: ApiBase
  apiKey?: ApiKey
}
