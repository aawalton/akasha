import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const temper = {
  id: "01a07c18-53a9-70f9-8d78-f1c36c87af0b",
  type: "page-type/namespace",
  slug: "temper",
  definition: "Temper's commands",
  parts: [
    "command/temper-auto-quest-trace",
    "command/temper-build-test",
    "command/temper-error-list",
    "command/temper-hps",
    "command/temper-package-typecheck",
    "command/temper-picture",
    "command/temper-quest-port-trace",
    "command/temper-stat-compare",
    "namespace/temper-addon",
    "namespace/temper-catalog",
    "namespace/temper-community",
    "namespace/temper-eso",
    "namespace/temper-inventory",
    "namespace/temper-upstream",
    "namespace/temper-watcher",
    "module/character-completion-reading",
  ],
  name: "temper",
  createdAt: "2026-09-07T13:39:24.201Z",
  updatedAt: "2026-10-14T20:35:43.699Z",
} as const satisfies Namespace
