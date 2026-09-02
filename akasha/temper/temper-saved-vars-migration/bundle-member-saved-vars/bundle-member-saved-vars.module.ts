import type { Module } from "@akasha/code-system/module"

export const bundleMemberSavedVars = {
  id: "01a06072-5abd-75b9-b1b8-07150462637e",
  pageTypeSlug: "module",
  slug: "bundle-member-saved-vars",
  definition: "one addon's saved variables lifted back out of the bundle file holding them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A member's globals are named by the member's own `addon.json`.",
    },
    {
      invariantKind: "departure",
      statement: "A member naming no global is skipped.",
    },
    {
      invariantKind: "departure",
      statement: "A migration already done leaves a marker naming what was written.",
    },
    {
      invariantKind: "departure",
      statement: "A marker present at all means the migration is done.",
    },
    {
      invariantKind: "departure",
      statement: "A member file about to be overwritten is copied aside first.",
    },
    {
      invariantKind: "departure",
      statement: "A copy aside is made once rather than on every run.",
    },
    {
      invariantKind: "departure",
      statement: "The marker carries the digest of the bundle file read from.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here removes the member's globals from the bundle file.",
    },
  ],
} as const satisfies Module
