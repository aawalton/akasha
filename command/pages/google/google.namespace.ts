import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const google = {
  id: "01a08cd7-2c63-718b-88bf-b2c367f52826",
  type: "page-type/namespace",
  slug: "google",
  definition: "what Alan keeps with Google, reached under a consent",
  parts: [
    "command/google-login",
    "namespace/google-calendar",
    "namespace/google-drive",
    "namespace/google-sheet",
  ],
  name: "google",
  createdAt: "2026-09-10T19:41:46.979Z",
  updatedAt: "2026-10-14T13:56:52.316Z",
} as const satisfies Namespace
