import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const toolchainManifest = {
  id: "01a0680f-d1b7-7713-9d02-85fa22f033a1",
  type: "page-type/module",
  slug: "toolchain-manifest",
  definition: "the url of each binary a CI toolchain installs",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A binary is fetched at a pinned version rather than latest.",
    },
  ],
  reachedByPath: ["CI_TOOLCHAIN_URLS"],
} as const satisfies Module
