import type { Secret } from "../secret.page-type.ts"

export const gotrueDbPassword = {
  id: "01a076d4-8c74-798a-b808-f1f883cb112c",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "gotrue-db-password",
  description:
    "the one value `pipeline-secrets.sops.yaml` held that no other page holds, kept as its file goes",
  placements: [],
} as const satisfies Secret
