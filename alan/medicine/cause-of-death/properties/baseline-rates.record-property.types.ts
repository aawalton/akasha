import type { AgeBandEnd } from "akasha/alan/medicine/cause-of-death/properties/age-band-end.number-property.types.ts"
import type { AgeBandStart } from "akasha/alan/medicine/cause-of-death/properties/age-band-start.number-property.types.ts"
import type { DeathsPerHundredThousand } from "akasha/alan/medicine/cause-of-death/properties/deaths-per-hundred-thousand.number-property.types.ts"
import type { HealthSourceCitation } from "akasha/alan/medicine/cause-of-death/properties/health-source-citation.text-property.types.ts"
import type { HealthSourceUrl } from "akasha/alan/medicine/cause-of-death/properties/health-source-url.url-property.types.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"

export type BaselineRates = List<{
  ageBandStart: AgeBandStart
  ageBandEnd: AgeBandEnd
  deathsPerHundredThousand: DeathsPerHundredThousand
  citation: HealthSourceCitation
  url?: HealthSourceUrl
}>
