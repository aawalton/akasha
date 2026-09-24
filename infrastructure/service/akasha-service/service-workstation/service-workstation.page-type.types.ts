import type { AkashaService } from "akasha/infrastructure/service/akasha-service/akasha-service.page-type.types.ts"
import type { Binds } from "akasha/infrastructure/service/akasha-service/service-workstation/properties/binds.text-property.types.ts"
import type { Enabled } from "akasha/infrastructure/service/akasha-service/service-workstation/properties/enabled.boolean-property.types.ts"
import type { LookedAt } from "akasha/infrastructure/service/akasha-service/service-workstation/properties/looked-at.instant-property.types.ts"
import type { NeedsSecrets } from "akasha/infrastructure/service/akasha-service/service-workstation/properties/needs-secrets.boolean-property.types.ts"
import type { Port } from "akasha/infrastructure/service/akasha-service/service-workstation/properties/port.number-property.types.ts"
import type { RestartsItself } from "akasha/infrastructure/service/akasha-service/service-workstation/properties/restarts-itself.boolean-property.types.ts"
import type { Running } from "akasha/infrastructure/service/akasha-service/service-workstation/properties/running.module-property-group.ts"
import type { Systemd } from "akasha/infrastructure/service/akasha-service/service-workstation/properties/systemd.record-property.types.ts"
import type { Told } from "akasha/infrastructure/service/akasha-service/service-workstation/properties/told.boolean-property.types.ts"
import type { Unbound } from "akasha/infrastructure/service/akasha-service/service-workstation/properties/unbound.text-property.types.ts"
import type { Well } from "akasha/infrastructure/service/akasha-service/service-workstation/properties/well.boolean-property.types.ts"
import type { WorkedAt } from "akasha/infrastructure/service/akasha-service/service-workstation/properties/worked-at.instant-property.types.ts"
import type { WorksWithinSeconds } from "akasha/infrastructure/service/akasha-service/service-workstation/properties/works-within-seconds.number-property.types.ts"

export type ServiceWorkstation = AkashaService & {
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
  running?: Running
  told?: Told
  restartsItself?: RestartsItself
}
