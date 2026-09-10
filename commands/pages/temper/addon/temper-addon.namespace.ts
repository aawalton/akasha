import type { Namespace } from "../../../namespaces/namespace.page-type.types.ts"

export const temperAddon = {
  id: "01a07c17-e1b0-77e5-b65e-84d51f07d0cf",
  pageTypeSlug: "namespace",
  type: "namespace",
  slug: "temper-addon",
  definition: "an addon of Temper's own, built and put where the game reads it",
  parts: [
    "command/temper-addon-build",
    "command/temper-addon-copy-metadata",
    "command/temper-addon-data-generate",
    "command/temper-addon-generate-load-order",
    "command/temper-addon-global-name-dependents",
    "command/temper-addon-install",
    "command/temper-addon-list",
    "command/temper-addon-resolve",
    "command/temper-addon-typecheck",
    "namespace/temper-addon-bundle",
  ],
} as const satisfies Namespace
