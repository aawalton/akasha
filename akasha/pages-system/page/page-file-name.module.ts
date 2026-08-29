import type { Module } from "../../code-system/module/module.page-type.ts"

export const pageFileName = {
  id: "01a04e3b-cd68-7be9-bd0f-a4ff61fa0c05",
  pageTypeSlug: "module",
  slug: "page-file-name",
  definition: "what a file's name says about the page it holds or stands beside",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A name is read as its last two dotted parts, so a stem carrying a dot stays the stem and the part before `.ts` is the tail.",
    },
    {
      invariantKind: "departure",
      statement:
        "Whether a tail names a page type or a file property is answered against the sets handed in, never from the name alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page and a file standing beside it answer the same page, so the two are matched without either being read.",
    },
    {
      invariantKind: "departure",
      statement:
        "The name a property's file stands under is built here as well as read here, so what `heldIn` takes apart and what `besideAt` puts together stay one rule.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path that is no TypeScript file is refused rather than answered, so no name is built from one that could carry no page.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing here reads the index or the disk. A name that answers a page is a name shaped like one, whether or not that page stands.",
    },
  ],
} as const satisfies Module
