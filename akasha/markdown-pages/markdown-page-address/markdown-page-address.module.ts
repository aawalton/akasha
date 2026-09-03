import type { Module } from "@akasha/code-system/module"

export const markdownPageAddress = {
  id: "01a06895-1cde-7000-af80-a20e7f701e3d",
  pageTypeSlug: "module",
  slug: "markdown-page-address",
  definition: "what form a markdown relation value takes when it names a page",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This says what form an address takes and looks no page up.",
    },
    { invariantKind: "departure", statement: "A page type and a slug are cut at the first `/`." },
  ],
} as const satisfies Module
