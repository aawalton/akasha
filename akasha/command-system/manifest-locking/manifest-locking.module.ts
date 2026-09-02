import type { Module } from "@akasha/code-system/module"

export const manifestLocking = {
  id: "01a0628d-2f09-7f63-8d3a-27494e9ec287",
  pageTypeSlug: "module",
  slug: "manifest-locking",
  definition: "the lockfile a landing's manifests warrant, made again and carried by that landing",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A manifest parted from its lockfile refuses every install of the whole tree.",
    },
    {
      invariantKind: "departure",
      statement: "A landing carrying no manifest is left alone without the lockfile being read.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest is one named `package.json` at the root or under a folder.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest arriving and one going are the same event here.",
    },
    {
      invariantKind: "departure",
      statement: "A landing carrying a lockfile of its own is taken at its word.",
    },
    {
      invariantKind: "departure",
      statement: "The lockfile is made from the manifests the base commit tracks.",
    },
    {
      invariantKind: "departure",
      statement: "The manifests a landing carries are worked into that set before the making.",
    },
    {
      invariantKind: "absence",
      statement: "The worktree is read for nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "The making happens in a scratch tree swept however the making ends.",
    },
    {
      invariantKind: "departure",
      statement: "A lockfile the making leaves unchanged is carried by no landing.",
    },
    {
      invariantKind: "departure",
      statement: "A lockfile that could not be made leaves the landing whole and says so.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here refuses a landing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes into the repository or commits.",
    },
    {
      invariantKind: "gap",
      statement: "A landing whose lockfile could not be made is answered for by the audit.",
    },
  ],
} as const satisfies Module
