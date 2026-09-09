import type { Secret } from "../secret.page-type.ts"

export const collectionsSecretsNotionCollectionsToken = {
  id: "01a076b6-ba57-717f-bd7c-674f40b84628",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "collections-secrets-notion-collections-token",
  placements: [{ resourceName: "collections-secrets", resourceKey: "NOTION_COLLECTIONS_TOKEN" }],
} as const satisfies Secret
