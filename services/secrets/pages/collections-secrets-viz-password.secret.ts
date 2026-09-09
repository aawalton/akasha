import type { Secret } from "../secret.page-type.ts"

export const collectionsSecretsVizPassword = {
  id: "01a076b8-24c9-7848-9ee9-ea947f547cee",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "collections-secrets-viz-password",
  placements: [{ resourceName: "collections-secrets", resourceKey: "VIZ_PASSWORD" }],
} as const satisfies Secret
