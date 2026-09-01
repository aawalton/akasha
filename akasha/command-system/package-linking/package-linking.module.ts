import type { Module } from "@akasha/code-system/module"

export const packageLinking = {
  id: "01a05e70-aa0f-7000-8196-db94598b6c0c",
  pageTypeSlug: "module",
  slug: "package-linking",
  definition:
    "the link the workspace reaches a package by, pointed at the folder that package is in",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The workspace reaches a package by the name the package was installed under.",
    },
    {
      invariantKind: "departure",
      statement: "What the workspace is reached through is a link beside the packages.",
    },
    {
      invariantKind: "departure",
      statement: "A link is spelled from where the link is to the folder the package is in.",
    },
    {
      invariantKind: "departure",
      statement: "A link already pointing at that folder is left as it is.",
    },
    {
      invariantKind: "departure",
      statement: "A link pointing anywhere else is repointed.",
    },
    {
      invariantKind: "departure",
      statement: "A name already taken by something that is no link is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "A folder a link points at is made where that folder is not there.",
    },
    {
      invariantKind: "constraint",
      statement: "A link whose folder is not there resolves nowhere.",
    },
    {
      invariantKind: "departure",
      statement: "Making a link hands back what takes that link back.",
    },
    {
      invariantKind: "departure",
      statement: "Taking a link back takes back every folder made for that link.",
    },
    {
      invariantKind: "departure",
      statement: "A folder holding anything is left as it is.",
    },
    {
      invariantKind: "departure",
      statement: "The name a link carries is read off the manifest calling the package that name.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest moving says its package is now where the manifest arrives.",
    },
  ],
} as const satisfies Module
