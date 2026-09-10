import type { Secret } from "../secret.page-type.types.ts"

export const cloudflaredCredsCredentialsJson = {
  id: "01a07698-6c93-79fd-bedd-3d2b46bcebbf",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "cloudflared-creds-credentials-json",
  placements: [{ resourceName: "cloudflared-creds", resourceKey: "credentials.json" }],
} as const satisfies Secret
