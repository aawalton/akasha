import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const temperEso = {
  id: "01a07c17-d4ab-71b4-868e-9f52fbed6b03",
  type: "page-type/namespace",
  slug: "temper-eso",
  definition: "the game's own files, read and written",
  parts: ["namespace/temper-eso-generate", "command/temper-eso-memory"],
  name: "eso",
  createdAt: "2026-09-07T13:38:51.691Z",
  updatedAt: "2026-10-19T18:40:53.679Z",
} as const satisfies Namespace
