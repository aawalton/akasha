import type { Namespace } from "akasha/commands/namespaces/namespace.page-type.types.ts"

export const temperCommunity = {
  id: "01a07c17-fe1d-7ad9-b3a5-9bea441bd023",
  type: "namespace",
  slug: "temper-community",
  definition: "an addon somebody outside Temper wrote",
  parts: [
    "command/temper-community-addon-install",
    "command/temper-community-addon-list",
    "command/temper-community-addon-update",
  ],
  name: "community",
} as const satisfies Namespace
