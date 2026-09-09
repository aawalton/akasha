import type { Module } from "@akasha/code/module"

export const manifestLocking = {
  id: "01a0628d-2f09-7f63-8d3a-27494e9ec287",
  pageTypeSlug: "module",
  slug: "manifest-locking",
  definition:
    "the lockfile a landing's manifests warrant, and the install pointing the workspace at them",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A manifest parted from its lockfile refuses every install of the whole tree.",
    },
    {
      invariantKind: "departure",
      statement: "A landing with no manifest is left alone without the lockfile being read.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest is a file named `package.json` at the root or under a folder.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest arriving and a manifest going are the same event here.",
    },
    {
      invariantKind: "departure",
      statement: "A landing with a lockfile of its own is taken at its word.",
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
      statement: "The lockfile is made with the worktree read for nothing.",
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
      statement: "The lockfile made is answered as a change rather than as a body.",
    },
    {
      invariantKind: "departure",
      statement:
        "A base commit tracking no lockfile is answered an addition rather than a replacement.",
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
      statement: "Nothing here commits.",
    },
    {
      invariantKind: "constraint",
      statement: "An install points the workspace at the folders its manifests name.",
    },
    {
      invariantKind: "departure",
      statement:
        "A landing with a manifest installs the checkout onto the commit that landing landed.",
    },
    {
      invariantKind: "departure",
      statement: "A landing with no manifest installs nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The install runs once the landing has given up the hold.",
    },
    {
      invariantKind: "constraint",
      statement: "Two landings with a manifest at once install at once.",
    },
    {
      invariantKind: "departure",
      statement:
        "A failed install leaves the commit made and says the tree reaches nothing until that install runs.",
    },
    {
      invariantKind: "departure",
      statement:
        "A lockfile the install makes again says the commit has a lockfile its manifests do not warrant.",
    },
    {
      invariantKind: "departure",
      statement:
        "An install takes away a link under `node_modules` reaching a folder no manifest names.",
    },
    {
      invariantKind: "departure",
      statement:
        "A link inside a folder under `node_modules` is reached as a link directly under `node_modules` is.",
    },
    {
      invariantKind: "departure",
      statement: "The folder with a link is reached whether or not the folder names a scope.",
    },
    {
      invariantKind: "departure",
      statement: "No link deeper than one folder below `node_modules` is reached.",
    },
    {
      invariantKind: "departure",
      statement: "A link reaching the folder whose manifest names that link is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "A link reaching a folder whose manifest names another package is taken away.",
    },
    {
      invariantKind: "departure",
      statement: "A folder under `node_modules` that is no link is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "The links an install took away are said alongside the install.",
    },
    {
      invariantKind: "gap",
      statement: "A landing whose lockfile could not be made is answered for by the audit.",
    },
    {
      invariantKind: "departure",
      statement:
        "A manifest moved from one path to another is a manifest going and a manifest arriving.",
    },
    {
      invariantKind: "departure",
      statement:
        "A manifest moved is renamed in the scratch tree before the manifests are worked in.",
    },
    {
      invariantKind: "departure",
      statement: "A landing moving a manifest to another path is a landing with a manifest.",
    },
  ],
} as const satisfies Module
