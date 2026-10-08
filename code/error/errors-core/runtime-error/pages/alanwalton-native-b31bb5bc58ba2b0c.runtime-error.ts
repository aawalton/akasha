import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonNativeB31bb5bc58ba2b0c = {
  id: "01a11be4-f595-7a44-ad63-eb83c69f4a09",
  type: "page-type/runtime-error",
  slug: "alanwalton-native-b31bb5bc58ba2b0c",
  fingerprint: "b31bb5bc58ba2b0c",
  app: "alanwalton-native",
  kind: "error",
  message:
    "activeEnergy: nothing new since the last send, but a direct read of the last 48 hours found 1132 samples and sent 1132 in 3 batches — 0 the server had not seen. stepCount: Health's store was shut — nothing sent. A locked phone reads exactly this way, so a run that fires while the phone is locked cannot get past it.",
  url: "stream-health-samples",
  userAgent: "StreamHealthSamplesIntent/508",
  firstSeenAt: "2026-10-08T14:22:31.849Z",
} as const satisfies RuntimeError
