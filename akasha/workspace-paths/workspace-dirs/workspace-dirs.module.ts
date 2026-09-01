import type { Module } from "../../code-system/module/module.page-type.ts"

export const workspaceDirs = {
  id: "01a05c48-deeb-700b-9305-52a189c99aa2",
  pageTypeSlug: "module",
  slug: "workspace-dirs",
  definition: "the folders a root manifest's workspaces entries stand for, with globs expanded",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only a glob of trailing star segments is expanded.",
    },
    {
      invariantKind: "departure",
      statement: "A glob of any other shape is thrown on.",
    },
    {
      invariantKind: "departure",
      statement: "An expanded folder holding no manifest is left out.",
    },
  ],
} as const satisfies Module
