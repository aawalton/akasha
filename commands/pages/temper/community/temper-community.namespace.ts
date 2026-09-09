import type { Namespace } from "../../../namespaces/namespace.page-type.ts"

export const temperCommunity = {
  id: "01a07c17-fe1d-7ad9-b3a5-9bea441bd023",
  pageTypeSlug: "namespace",
  type: "namespace",
  slug: "temper-community",
  definition: "an addon somebody outside Temper wrote",
  parts: [
    "command/temper-community-addon-install",
    "command/temper-community-addon-list",
    "command/temper-community-addon-update",
  ],
} as const satisfies Namespace
