import type { Module } from "@akasha/code/module"

export const workedTyping = {
  id: "01a07672-9764-7d20-8eb7-55cab242cfa3",
  pageTypeSlug: "module",
  type: "module",
  slug: "worked-typing",
  definition: "the type with a page type's calculations beside its stored keys, written again",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The type is written by a machine rather than composed by an agent.",
    },
    {
      invariantKind: "departure",
      statement:
        "The type is worked out again only where the change could turn what the type holds.",
    },
    {
      invariantKind: "departure",
      statement:
        "What a change could turn is read from the names of the paths it has and the pages at them.",
    },
    {
      invariantKind: "departure",
      statement: "A guard that cannot tell works the type out rather than leaving the type stale.",
    },
    {
      invariantKind: "departure",
      statement: "A page type with no calculation is given no file.",
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
      statement:
        "A stored property declaring a worked form is omitted from the type the worked type extends.",
    },
    {
      invariantKind: "departure",
      statement: "A page type is reached through the shadow of the change being judged.",
    },
    {
      invariantKind: "departure",
      statement: "A property's file is read at the path the shadow says has that file.",
    },
    {
      invariantKind: "departure",
      statement: "That file's body is read through the change rather than off the disk.",
    },
    {
      invariantKind: "departure",
      statement: "What is written again is answered as a change rather than as a body.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file that is not there yet is answered as an addition rather than a replacement.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body written here is handed to the formatter rather than left for a landing to reformat.",
    },
    {
      invariantKind: "departure",
      statement: "A file already with the body that would be written again is left alone.",
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
