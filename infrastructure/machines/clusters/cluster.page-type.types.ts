import type { TalosSecrets } from "akasha/infrastructure/machines/clusters/properties/talos-secrets.text-property.types.ts"
import type { Host } from "akasha/infrastructure/machines/hosts/host.page-type.types.ts"

export type Cluster = Host & {
  talosSecrets?: TalosSecrets
}
