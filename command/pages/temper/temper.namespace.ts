import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const temper = {
  id: "01a07c18-53a9-70f9-8d78-f1c36c87af0b",
  type: "page-type/namespace",
  slug: "temper",
  definition: "Temper's commands",
  parts: [
    "command/temper-auto-quest-trace",
    "command/temper-error-list",
    "command/temper-package-typecheck",
    "command/temper-picture",
    "namespace/temper-addon",
    "namespace/temper-catalog",
    "namespace/temper-community",
    "namespace/temper-eso",
    "namespace/temper-inventory",
    "namespace/temper-upstream",
    "namespace/temper-watcher",
  ],
  name: "temper",
} as const satisfies Namespace
