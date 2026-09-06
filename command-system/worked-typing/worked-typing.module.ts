import type { Module } from "@akasha/code-system/module"

export const workedTyping = {
  id: "01a07672-9764-7d20-8eb7-55cab242cfa3",
  pageTypeSlug: "module",
  slug: "worked-typing",
  definition: "the type carrying a page type's calculations beside its stored keys, written again",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The type is written by a machine rather than composed by an agent.",
    },
    {
      invariantKind: "departure",
      statement: "The type is written again where the lockfile is written again.",
    },
    {
      invariantKind: "departure",
      statement: "A page type carrying no calculation is given no file.",
    },
    {
      invariantKind: "departure",
      statement: "A page type stating no property to hold the file is given no file.",
    },
    {
      invariantKind: "departure",
      statement: "The file sits beside the page type as that page type's `worked` section.",
    },
    {
      invariantKind: "departure",
      statement: "A key comes out in the order the page type declares its properties.",
    },
    {
      invariantKind: "departure",
      statement: "A calculation's key is read from the property slug rather than camelised twice.",
    },
    {
      invariantKind: "departure",
      statement:
        "A stored property is left off unless that property's own file declares its worked form.",
    },
    {
      invariantKind: "departure",
      statement: "A stored property declaring a worked form is omitted from the type it extends.",
    },
    {
      invariantKind: "departure",
      statement: "A page type is reached through the shadow of the change being judged.",
    },
    {
      invariantKind: "departure",
      statement: "A property's file is read at the path the shadow says holds that file.",
    },
    {
      invariantKind: "departure",
      statement: "A body is handed to the formatter here, so no landing reformats what this wrote.",
    },
    {
      invariantKind: "departure",
      statement: "A file already holding what would be written again is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing here refuses a landing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here commits.",
    },
  ],
} as const satisfies Module
