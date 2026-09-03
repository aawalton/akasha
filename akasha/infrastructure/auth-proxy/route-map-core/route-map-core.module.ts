import type { Module } from "@akasha/code-system/module"

export const routeMapCore = {
  id: "01a06863-8e7c-7cd0-bc1e-33ed95b0fe0a",
  pageTypeSlug: "module",
  slug: "route-map-core",
  definition: "a host-to-target map read out of the text it is written as",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A target written as a bare address means no proxy behind the address.",
    },
    {
      invariantKind: "departure",
      statement: "Text the proxy cannot read as a map stops the proxy from starting.",
    },
  ],
} as const satisfies Module
