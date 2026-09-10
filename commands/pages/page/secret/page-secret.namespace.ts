import type { Namespace } from "../../../namespaces/namespace.page-type.types.ts"

export const pageSecret = {
  id: "01a07bc6-efea-754e-b4cc-6744893bc509",
  pageTypeSlug: "namespace",
  type: "namespace",
  slug: "page-secret",
  definition: "a value a page carries that the files hide",
  parts: [
    "command/page-secret-clear",
    "command/page-secret-reveal",
    "command/page-secret-set",
    "command/page-secret-show",
  ],
} as const satisfies Namespace
