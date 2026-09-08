import type { Namespace } from "../../../command-system/namespaces/namespace.page-type.ts"

export const refresh = {
  id: "01a08209-80a1-7e1a-9c9e-2adeb0bbc194",
  pageTypeSlug: "namespace",
  slug: "refresh",
  definition: "what a page carries, worked out again from where it came",
  partSlugs: ["command/refresh-attributes"],
} as const satisfies Namespace
