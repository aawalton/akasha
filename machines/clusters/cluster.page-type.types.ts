import type { TalosSecrets } from "akasha/machines/clusters/properties/talos-secrets.text-property.types.ts"
import type { Host } from "akasha/machines/hosts/host.page-type.types.ts"

export type Cluster = Host & {
  talosSecrets?: TalosSecrets
}
