import type { Service } from "akasha/services/service.page-type.types.ts"
import type { Binds } from "akasha/services/workstation-services/properties/binds.text-property.types.ts"
import type { Enabled } from "akasha/services/workstation-services/properties/enabled.boolean-property.types.ts"
import type { LookedAt } from "akasha/services/workstation-services/properties/looked-at.instant-property.types.ts"
import type { NeedsSecrets } from "akasha/services/workstation-services/properties/needs-secrets.boolean-property.types.ts"
import type { Port } from "akasha/services/workstation-services/properties/port.number-property.types.ts"
import type { Runs } from "akasha/services/workstation-services/properties/runs.text-property.types.ts"
import type { Systemd } from "akasha/services/workstation-services/properties/systemd.record-property.ts"
import type { Unbound } from "akasha/services/workstation-services/properties/unbound.text-property.types.ts"
import type { Well } from "akasha/services/workstation-services/properties/well.boolean-property.types.ts"
import type { WorkedAt } from "akasha/services/workstation-services/properties/worked-at.instant-property.types.ts"
import type { WorksWithinSeconds } from "akasha/services/workstation-services/properties/works-within-seconds.number-property.types.ts"

export type WorkstationService = Service & {
  runs: Runs
  enabled: Enabled
  systemd?: Systemd
  needsSecrets?: NeedsSecrets
  port?: Port
  binds?: Binds
  worksWithinSeconds?: WorksWithinSeconds
  unbound?: Unbound
  well?: Well
  lookedAt?: LookedAt
  workedAt?: WorkedAt
}
