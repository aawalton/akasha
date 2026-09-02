import type { Module } from "@akasha/code-system/module"

export const markdownPageName = {
  id: "01a05cc6-2a1c-776c-88f5-4be2c8d49e52",
  pageTypeSlug: "module",
  slug: "markdown-page-name",
  definition: "the stem and the page type read off the name of a markdown file",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A markdown page is named stem then page type then `md`.",
    },
    {
      invariantKind: "departure",
      statement: "A name carrying no page type names no page.",
    },
    {
      invariantKind: "departure",
      statement: "Only the part after the last slash is read.",
    },
  ],
} as const satisfies Module
