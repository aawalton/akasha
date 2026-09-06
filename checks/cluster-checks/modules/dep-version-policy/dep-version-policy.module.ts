import type { Module } from "@akasha/code/module"

export const depVersionPolicy = {
  id: "01a077d5-b8e3-77e9-88cd-90aaee3a1970",
  pageTypeSlug: "module",
  slug: "dep-version-policy",
  definition: "the packages every manifest holds to one exact version",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A package named here is held to one version wherever a manifest names that package.",
    },
    {
      invariantKind: "departure",
      statement: "A version carrying a range is no exact version.",
    },
    {
      invariantKind: "departure",
      statement: "An aliased spec is read for the version the spec names.",
    },
    {
      invariantKind: "departure",
      statement: "A package no manifest names is passed over.",
    },
  ],
} as const satisfies Module
