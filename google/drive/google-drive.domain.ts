import type { Domain } from "../../domains/domain.page-type.types.ts"

export const googleDrive = {
  id: "01a05bec-fc09-7a61-8e09-909bc24a66c2",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "google-drive",
  definition: "reading a file out of Alan's Google Drive",
  parts: [
    "module/drive-credentials",
    "module/drive-auth",
    "module/drive-client",
    "module/drive-file-schema",
    "module/drive-files",
  ],
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here writes to Drive.",
    },
  ],
} as const satisfies Domain
