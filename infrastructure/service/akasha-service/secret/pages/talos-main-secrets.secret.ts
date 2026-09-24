import type { Secret } from "akasha/infrastructure/service/akasha-service/secret/secret.page-type.types.ts"

export const talosMainSecrets = {
  id: "01a0a04a-9321-7ea4-b7c6-7ccf320394ba",
  type: "page-type/secret",
  slug: "talos-main-secrets",
} as const satisfies Secret
