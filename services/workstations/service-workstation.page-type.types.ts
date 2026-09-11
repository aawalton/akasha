import type { Service } from "akasha/services/service.page-type.types.ts"
import type { Binds } from "akasha/services/workstations/properties/binds.text-property.types.ts"
import type { Enabled } from "akasha/services/workstations/properties/enabled.boolean-property.types.ts"
import type { LookedAt } from "akasha/services/workstations/properties/looked-at.instant-property.types.ts"
import type { NeedsSecrets } from "akasha/services/workstations/properties/needs-secrets.boolean-property.types.ts"
import type { Port } from "akasha/services/workstations/properties/port.number-property.types.ts"
import type { Runs } from "akasha/services/workstations/properties/runs.text-property.types.ts"
import type { Starts } from "akasha/services/workstations/properties/starts.record-property.types.ts"
import type { Systemd } from "akasha/services/workstations/properties/systemd.record-property.types.ts"
import type { Unbound } from "akasha/services/workstations/properties/unbound.text-property.types.ts"
import type { Well } from "akasha/services/workstations/properties/well.boolean-property.types.ts"
import type { WorkedAt } from "akasha/services/workstations/properties/worked-at.instant-property.types.ts"
import type { WorksWithinSeconds } from "akasha/services/workstations/properties/works-within-seconds.number-property.types.ts"

export type ServiceWorkstation = Service & {
  runs?: Runs
  starts?: Starts
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
