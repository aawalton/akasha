import type { Module } from "@akasha/code-system/module"

export const proxyCore = {
  id: "01a06863-8e7c-73d0-a5a6-6291492430fc",
  pageTypeSlug: "module",
  slug: "proxy-core",
  definition: "a canned body, a bad gateway, and a fetch that falls to one",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An upstream that cannot be reached is answered as a bad gateway.",
    },
    {
      invariantKind: "departure",
      statement:
        "What went wrong is reported to the caller of the fetch rather than to the client.",
    },
  ],
} as const satisfies Module
