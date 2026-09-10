import type { Namespace } from "../../../namespaces/namespace.page-type.types.ts"

export const googleDrive = {
  id: "01a08cdb-7bc4-7fe8-b726-dbd570f362f3",
  pageTypeSlug: "namespace",
  type: "namespace",
  slug: "google-drive",
  definition: "the files in Alan's Google Drive",
  parts: ["command/google-drive-fetch"],
} as const satisfies Namespace
