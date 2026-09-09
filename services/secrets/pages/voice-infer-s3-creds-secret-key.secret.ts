import type { Secret } from "../secret.page-type.ts"

export const voiceInferS3CredsSecretKey = {
  id: "01a082fc-346e-7b53-af4b-441cad901b1a",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "voice-infer-s3-creds-secret-key",
  placements: [{ resourceName: "voice-infer-s3-creds", resourceKey: "secret_key" }],
} as const satisfies Secret
