import type { Service } from "../service.page-type.types.ts"
import type { Binds } from "./properties/binds.text-property.ts"
import type { Enabled } from "./properties/enabled.boolean-property.ts"
import type { NeedsSecrets } from "./properties/needs-secrets.boolean-property.ts"
import type { Port } from "./properties/port.number-property.ts"
import type { Runs } from "./properties/runs.text-property.ts"
import type { Systemd } from "./properties/systemd.record-property.ts"

export type WorkstationService = Service & {
  runs: Runs
  enabled: Enabled
  systemd?: Systemd
  needsSecrets?: NeedsSecrets
  port?: Port
  binds?: Binds
}
