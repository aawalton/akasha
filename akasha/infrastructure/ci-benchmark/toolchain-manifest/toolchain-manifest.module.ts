import type { Module } from "@akasha/code-system/module"

export const toolchainManifest = {
  id: "01a0680f-d1b7-7713-9d02-85fa22f033a1",
  pageTypeSlug: "module",
  slug: "toolchain-manifest",
  definition: "where each binary a CI toolchain installs is fetched from",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A binary is fetched at a pinned version rather than latest.",
    },
  ],
} as const satisfies Module
