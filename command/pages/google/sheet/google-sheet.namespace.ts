import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const googleSheet = {
  id: "01a13ab3-9ddd-7125-bf83-ed6bccc94b94",
  type: "page-type/namespace",
  slug: "google-sheet",
  definition: "the spreadsheets Alan keeps with Google",
  parts: [
    "command/google-sheet-read",
    "command/google-sheet-tabs",
    "command/google-sheet-write",
    "module/sheet-answering",
  ],
  name: "sheet",
  createdAt: "2026-10-14T13:56:52.316Z",
  updatedAt: "2026-10-14T13:56:52.316Z",
} as const satisfies Namespace
