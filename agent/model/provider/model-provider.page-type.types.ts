import type { ApiBase } from "akasha/agent/model/provider/properties/api-base.url-property.types.ts"
import type { ProviderModel } from "akasha/agent/model/provider/properties/provider-model.text-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export type ModelProvider = Domain & {
  apiBase: ApiBase
  providerModel?: ProviderModel
}
