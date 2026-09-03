import type { Module } from "@akasha/code-system/module"

export const housingUpstreamPort = {
  id: "01a0683b-e6a3-7d85-beb0-b2d13fdf25bb",
  pageTypeSlug: "module",
  slug: "housing-upstream-port",
  definition: "the house library upstream PortToFriendsHouse carries, copied out as TypeScript",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The upstream Lua file is read by running the file in a sandboxed Lua machine.",
    },
    {
      invariantKind: "departure",
      statement: "The filter constants the upstream file reads are seeded before the file runs.",
    },
    {
      invariantKind: "departure",
      statement: "The EU list and the NA list are built by calling upstream's own builders.",
    },
    {
      invariantKind: "departure",
      statement: "An entry is refused where any field it carries is not the shape expected.",
    },
    {
      invariantKind: "departure",
      statement: "A list longer than a part's ceiling is written as numbered parts and a barrel.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every generated file already standing is removed before the new ones are written.",
    },
    {
      invariantKind: "departure",
      statement: "The package the ported data lands in is read from the library's own naming.",
    },
    {
      invariantKind: "departure",
      statement: "The checkout the ported files land in is named by the caller.",
    },
  ],
} as const satisfies Module
