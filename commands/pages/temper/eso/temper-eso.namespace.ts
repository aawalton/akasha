import type { Namespace } from "../../../namespaces/namespace.page-type.ts"

export const temperEso = {
  id: "01a07c17-d4ab-71b4-868e-9f52fbed6b03",
  pageTypeSlug: "namespace",
  slug: "temper-eso",
  definition: "the game's own files, read and written out from",
  parts: ["command/temper-eso-typings-audit", "namespace/temper-eso-generate"],
} as const satisfies Namespace
