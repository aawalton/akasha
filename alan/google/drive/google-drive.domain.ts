import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const googleDrive = {
  id: "01a05bec-fc09-7a61-8e09-909bc24a66c2",
  type: "page-type/domain",
  slug: "google-drive",
  definition: "the files in Alan's Google Drive",
  parts: [
    "domain/google-drive-service",
    "module/drive-auth",
    "module/drive-client",
    "module/drive-credentials",
    "module/drive-file-schema",
    "module/drive-files",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes to Google Drive.",
    },
  ],
} as const satisfies Domain
