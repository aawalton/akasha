import type { Host } from "../hosts/host.page-type.ts"
import type { TalosSecrets } from "./properties/talos-secrets.text-property.ts"

export type Cluster = Host & {
  talosSecrets?: TalosSecrets
}
