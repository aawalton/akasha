import type { Secret } from "akasha/infrastructure/services/secrets/secret.page-type.types.ts"

export const etcdSnapshotTalosconfigConfig = {
  id: "01a07697-b12a-7d8d-b188-f5498e5dfc67",
  type: "secret",
  slug: "etcd-snapshot-talosconfig-config",
  placements: [{ resourceName: "etcd-snapshot-talosconfig", resourceKey: "config" }],
} as const satisfies Secret
