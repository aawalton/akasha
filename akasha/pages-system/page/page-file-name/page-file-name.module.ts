import type { Module } from "@akasha/code-system/module"

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
      statement: "A name is read from its slug.",
    },
    {
      invariantKind: "departure",
      statement: "A slug never carries a dot.",
    },
    {
      invariantKind: "departure",
      statement: "The page type follows the slug.",
    },
    {
      invariantKind: "departure",
      statement: "What follows the page type is a list of sections.",
    },
    {
      invariantKind: "departure",
      statement: "The last part is what the file holds.",
    },
    {
      invariantKind: "departure",
      statement:
        "Whether the page type slot names a page type is answered against the set handed in.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a section names a file property is answered against the set handed in.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name carrying a known page type but held as anything but TypeScript is no page.",
    },
    {
      invariantKind: "departure",
      statement: "What a property's file holds is read as written.",
    },
    {
      invariantKind: "departure",
      statement: "A page and a file standing beside the page answer the same page.",
    },
    {
      invariantKind: "departure",
      statement: "The name a property's file stands under is built here as well as read here.",
    },
    {
      invariantKind: "departure",
      statement: "What `heldIn` takes apart and what the builders here put together stay one rule.",
    },
    {
      invariantKind: "departure",
      statement: "A path that is no TypeScript file is refused rather than answered.",
    },
    {
      invariantKind: "departure",
      statement: "The section `uncommitted` is reserved.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file whose only section is `uncommitted` holds the uncommitted values of that file's page.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file whose only section is `uncommitted` is never a property's file nor a page.",
    },
    {
      invariantKind: "departure",
      statement: "A section list may end in `uncommitted`.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file whose section list ends in `uncommitted` holds a property that is not committed.",
    },
    {
      invariantKind: "departure",
      statement: "The section `sops` is reserved.",
    },
    {
      invariantKind: "departure",
      statement: "A file whose only section is `sops` holds the secret values of that file's page.",
    },
    {
      invariantKind: "departure",
      statement: "A file whose only section is `sops` is never a property's file nor a page.",
    },
    {
      invariantKind: "departure",
      statement: "One sops file holds every secret a page carries.",
    },
    {
      invariantKind: "departure",
      statement: "A page's sops file is what the sops file already stands under.",
    },
    {
      invariantKind: "departure",
      statement: "A file property slug is never a reserved section.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index or the disk.",
    },
  ],
} as const satisfies Module
