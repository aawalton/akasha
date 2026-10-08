import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const temperAddon = {
  id: "01a07c17-e1b0-77e5-b65e-84d51f07d0cf",
  type: "page-type/namespace",
  slug: "temper-addon",
  definition: "an addon of Temper's own, built and put where the game reads it",
  parts: [
    "command/temper-addon-copy-metadata",
    "command/temper-addon-generate-load-order",
    "command/temper-addon-global-name-dependent",
    "command/temper-addon-list",
    "command/temper-addon-resolve",
    "command/temper-addon-typecheck",
  ],
  name: "addon",
  createdAt: "2026-09-07T13:38:55.024Z",
  updatedAt: "2026-09-26T15:14:05.000Z",
} as const satisfies Namespace
