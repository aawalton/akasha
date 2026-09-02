import type { Module } from "@akasha/code-system/module"

export const addonsBundleDir = {
  id: "01a0640f-850f-76fa-aa1c-8817cc184e55",
  pageTypeSlug: "module",
  slug: "addons-bundle-dir",
  definition: "the folder the built addon bundles are served out of",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A folder named relative is taken against the folder the server runs in.",
    },
  ],
} as const satisfies Module
