import type { Module } from "@akasha/code-system/module"

export const watcherUnit = {
  id: "01a06039-9c8a-7a1f-b8b9-82b0ca81bb70",
  pageTypeSlug: "module",
  slug: "watcher-unit",
  definition: "whether the systemd unit the temper watcher runs under is active",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The unit is named here rather than handed in.",
    },
    {
      invariantKind: "departure",
      statement: "A systemctl that answers anything other than zero reads as inactive.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here starts the unit.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here stops the unit.",
    },
  ],
} as const satisfies Module
