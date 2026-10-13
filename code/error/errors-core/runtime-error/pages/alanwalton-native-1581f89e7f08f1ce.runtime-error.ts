import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonNative1581f89e7f08f1ce = {
  id: "01a136a8-c76c-7311-abd8-299a15b0259b",
  type: "page-type/runtime-error",
  slug: "alanwalton-native-1581f89e7f08f1ce",
  fingerprint: "1581f89e7f08f1ce",
  app: "alanwalton-native",
  kind: "error",
  message:
    "activeEnergy: nothing new since the last send, but a direct read of the last 48 hours found 372 samples and sent 372 in 1 batches — 0 the server had not seen. stepCount: Health's store was shut — nothing sent. A locked phone reads exactly this way, so a run that fires while the phone is locked cannot get past it.",
  url: "stream-health-samples",
  userAgent: "StreamHealthSamplesIntent/550",
  firstSeenAt: "2026-10-13T19:06:32.422Z",
  createdAt: "2026-10-13T19:06:33.196Z",
  updatedAt: "2026-10-13T19:06:33.196Z",
} as const satisfies RuntimeError
