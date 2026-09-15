import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const recipientResolverDeps = {
  id: "01a0657d-a75e-7001-8ac5-1d57805bf5ae",
  type: "page-type/module",
  slug: "recipient-resolver-deps",
  definition:
    "the effects a resolver tick calls: seat lookup, inbound reading, presence, revive and report",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat whose presence cannot be established is taken as present.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat is told about at most once.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A later tick finding the same seat unrevivable tells nobody again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Alan is told where the seat that did not come back is the harness lead itself.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A dry run tells nobody and marks nothing as told.",
    },
  ],
} as const satisfies Module
