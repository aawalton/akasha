import type { Secret } from "../secret.page-type.types.ts"

export const voiceInferS3CredsAccessKey = {
  id: "01a082fc-2552-7648-9291-73dcd61de6f3",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "voice-infer-s3-creds-access-key",
  placements: [{ resourceName: "voice-infer-s3-creds", resourceKey: "access_key" }],
} as const satisfies Secret
