import type { Namespace } from "../../../../namespaces/namespace.page-type.ts"

export const temperAddonBundle = {
  id: "01a07c17-2d90-7801-a27b-e541407bcdfa",
  pageTypeSlug: "namespace",
  type: "namespace",
  slug: "temper-addon-bundle",
  definition: "the addons shipped together as one",
  parts: ["command/temper-addon-bundle-build", "command/temper-addon-bundle-publish"],
} as const satisfies Namespace
