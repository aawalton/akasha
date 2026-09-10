import type { Namespace } from "../../namespaces/namespace.page-type.types.ts"

export const temper = {
  id: "01a07c18-53a9-70f9-8d78-f1c36c87af0b",
  pageTypeSlug: "namespace",
  type: "namespace",
  slug: "temper",
  definition: "the commands Temper is run by",
  parts: [
    "command/temper-auto-quest-trace",
    "command/temper-errors-list",
    "command/temper-package-typecheck",
    "namespace/temper-addon",
    "namespace/temper-catalog",
    "namespace/temper-community",
    "namespace/temper-eso",
    "namespace/temper-inventory",
    "namespace/temper-upstream",
    "namespace/temper-watcher",
  ],
} as const satisfies Namespace
