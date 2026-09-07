import type { ChangeMechanicalFolder } from "../../folder/change-mechanical-folder.page-type.ts"

export const removePage = {
  id: "01a07750-f2bb-7d0e-b301-cc3c2ede50b1",
  pageTypeSlug: "change-mechanical-folder",
  slug: "remove-page",
  definition: "one page taken away with every file that page keeps beside it",
  code: "ts",
  test: "ts",
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page and every file that page keeps beside the page go together.",
    },
    {
      invariantKind: "departure",
      statement: "A file beside the page goes whether or not git tracks that file.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which files sit beside a page is read from the index rather than from the folder.",
    },
    {
      invariantKind: "departure",
      statement: "A file the page claims and the tree holds no body at is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "The page's own file is taken away by `remove-page-file`.",
    },
    {
      invariantKind: "departure",
      statement: "A file beside the page under a TypeScript name goes by `remove-code-file`.",
    },
    {
      invariantKind: "departure",
      statement: "Every other file beside the page goes by `remove-file`.",
    },
    {
      invariantKind: "departure",
      statement: "The files beside the page go before the page's own file.",
    },
    {
      invariantKind: "departure",
      statement: "The page's entry in the parent's `part-slugs` is dropped before any file goes.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal from any change reached here refuses the whole removal.",
    },
    {
      invariantKind: "departure",
      statement: "Every index question here is asked of the world the caller hands in.",
    },
    {
      invariantKind: "absence",
      statement: "No index question here is asked of the index on disk.",
    },
    {
      invariantKind: "departure",
      statement: "A page an earlier change in the same answer took away is no page here.",
    },
    {
      invariantKind: "departure",
      statement: "A path the world names no page at is refused.",
    },
    {
      invariantKind: "absence",
      statement: "This change names no guard of its own.",
    },
    {
      invariantKind: "departure",
      statement: "Containment is a relation named in the parent's `part-slugs`.",
    },
    {
      invariantKind: "departure",
      statement: "The parent naming the page in `part-slugs` is answered from that same world.",
    },
    {
      invariantKind: "departure",
      statement:
        "The page's entry in the parent's `part-slugs` is dropped by `remove-property-value`.",
    },
    {
      invariantKind: "departure",
      statement: "A parent naming the page bare rather than qualified is dropped just the same.",
    },
    {
      invariantKind: "gap",
      statement:
        "The guards the tests here run are imported rather than reached through `guard-slugs`.",
    },
  ],
} as const satisfies ChangeMechanicalFolder
