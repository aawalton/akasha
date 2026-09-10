import type { Secret } from "../secret.page-type.types.ts"

export const collectionsSecretsVizUsername = {
  id: "01a076b8-37d4-703e-b90a-6293b80fa54b",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "collections-secrets-viz-username",
  placements: [{ resourceName: "collections-secrets", resourceKey: "VIZ_USERNAME" }],
} as const satisfies Secret
