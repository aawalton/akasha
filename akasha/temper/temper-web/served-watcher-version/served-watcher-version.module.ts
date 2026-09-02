import type { Module } from "@akasha/code-system/module"

export const servedWatcherVersion = {
  id: "01a0640f-850f-75fc-8894-4e1d0d24e30c",
  pageTypeSlug: "module",
  slug: "served-watcher-version",
  definition: "the watcher version the server is handing out",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A stamp file that is absent or empty reads as no version served.",
    },
  ],
} as const satisfies Module
