import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageFileName = {
  id: "01a04e3b-cd68-7be9-bd0f-a4ff61fa0c05",
  type: "module",
  slug: "page-file-name",
  definition: "what a file's name says about the page it has or sits beside",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name is read from its slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A slug never has a dot.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The page type follows the slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A list of sections follows the page type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The last part is the form the file has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page's name is the slug and the page type parted by a dot.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Whether the page type slot names a page type is answered against the set handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whether a section names a file property is answered against the set handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A section list is a property slug or a group slug and then a member slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A group member's key is the group slug and the member slug joined by a dot.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A section list of two is read only where the set handed in has that key.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A name carrying a known page type but held as anything but TypeScript is no page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The form a property's file has is read as written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page and a file beside the page answer the same page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The name a property's file is under is built here as well as read here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The name `heldIn` takes apart and the name the builders here put together stay one rule.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whether the sections past a page's name are a property's is answered here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path that is no TypeScript file is refused rather than answered.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The section `uncommitted` is reserved.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A file whose only section is `uncommitted` has the uncommitted values of that file's page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A file whose only section is `uncommitted` is never a property's file nor a page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A section list may end in `uncommitted`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A file whose section list ends in `uncommitted` has a property that is not committed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The section `sops` is reserved.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file whose only section is `sops` has the secret values of that file's page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file whose only section is `sops` is never a property's file nor a page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One sops file has every secret a page has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page's sops file is the name that sops file is already under.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file property slug is never a reserved section.",
    },

    {
      invariantKind: "invariant-kind/departure",
      statement: "A part section is the word `part` and a part number.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The least part number is two.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A part section follows the property slug and precedes `uncommitted`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The first of a property's files has no part section.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reserved section has no part.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file git leaves out of the commit spells `uncommitted` between two dots.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That spelling is read from the name alone, whatever else the name is.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the index or the disk.",
    },
  ],
} as const satisfies Module
