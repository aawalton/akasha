import type { Module } from "@akasha/code-system/module"

export const libSetsGenBlacklistedSetIds = {
  id: "01a061d7-7bcc-7252-a57f-0353cca7caff",
  pageTypeSlug: "module",
  slug: "lib-sets-gen-blacklisted-set-ids",
  definition: "the eleven set ids marked blacklisted",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This table is ported from the upstream library at a pinned commit.",
    },
  ],
} as const satisfies Module
