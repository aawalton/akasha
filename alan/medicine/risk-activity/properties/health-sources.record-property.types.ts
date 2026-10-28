import type { HealthSourceCitation } from "akasha/alan/medicine/cause-of-death/properties/health-source-citation.text-property.types.ts"
import type { HealthSourceUrl } from "akasha/alan/medicine/cause-of-death/properties/health-source-url.url-property.types.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"

export type HealthSources = List<{
  citation: HealthSourceCitation
  url?: HealthSourceUrl
}>
