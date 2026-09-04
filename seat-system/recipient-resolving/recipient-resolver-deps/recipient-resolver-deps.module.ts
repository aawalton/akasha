import type { Module } from "@akasha/code-system/module"

export const recipientResolverDeps = {
  id: "01a0657d-a75e-7001-8ac5-1d57805bf5ae",
  pageTypeSlug: "module",
  slug: "recipient-resolver-deps",
  definition:
    "the effects a resolver tick calls: seat lookup, inbound reading, presence, revive and report",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat whose presence cannot be established is taken as present.",
    },
    {
      invariantKind: "departure",
      statement: "A seat is told about at most once.",
    },
    {
      invariantKind: "departure",
      statement: "A later tick finding the same seat unrevivable tells nobody again.",
    },
    {
      invariantKind: "departure",
      statement: "Alan is told where the seat that did not come back is the harness lead itself.",
    },
    {
      invariantKind: "absence",
      statement: "A dry run tells nobody and marks nothing as told.",
    },
  ],
} as const satisfies Module
