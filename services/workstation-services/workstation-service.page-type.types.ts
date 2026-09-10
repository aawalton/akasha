import type { Service } from "../service.page-type.types.ts"
import type { Binds } from "./properties/binds.text-property.ts"
import type { Enabled } from "./properties/enabled.boolean-property.types.ts"
import type { LookedAt } from "./properties/looked-at.instant-property.types.ts"
import type { NeedsSecrets } from "./properties/needs-secrets.boolean-property.types.ts"
import type { Port } from "./properties/port.number-property.types.ts"
import type { Runs } from "./properties/runs.text-property.ts"
import type { Systemd } from "./properties/systemd.record-property.ts"
import type { Unbound } from "./properties/unbound.text-property.ts"
import type { Well } from "./properties/well.boolean-property.types.ts"
import type { WorkedAt } from "./properties/worked-at.instant-property.types.ts"
import type { WorksWithinSeconds } from "./properties/works-within-seconds.number-property.types.ts"

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
