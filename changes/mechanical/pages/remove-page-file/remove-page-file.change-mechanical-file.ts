import type { ChangeMechanicalFile } from "../../file/change-mechanical-file.page-type.ts"

export const removePageFile = {
  id: "01a079a5-8d4a-70e6-a33b-73d49d514b05",
  pageTypeSlug: "change-mechanical-file",
  slug: "remove-page-file",
  changeModeSlug: "change-mode-remove",
  definition: "one page taken away with every file that page keeps beside the page",
  code: "ts",
  test: "ts",
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
  guardSlugs: [
    "change-guard/relation-not-left-hanging",
    "change-guard/claimed-file-not-left-behind",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path under no page name is refused here.",
    },
    {
      invariantKind: "departure",
      statement: "The page types a name is read against are the ones the world files.",
    },
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
      statement: "The page's entry in the parent's `part-slugs` is dropped before any file goes.",
    },
    {
      invariantKind: "departure",
      statement: "A file importing a second file going in the same act goes before that file.",
    },
    {
      invariantKind: "departure",
      statement: "The files beside the page go before the page's own file.",
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
      statement: "The page's own file goes by `remove-code-file`.",
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
      invariantKind: "departure",
      statement: "Containment is a relation named in the parent's `part-slugs`.",
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
      invariantKind: "departure",
      statement: "The relations naming the page are judged by a guard this change names.",
    },
    {
      invariantKind: "departure",
      statement: "The files beside the page are judged by a guard this change names.",
    },
  ],
} as const satisfies ChangeMechanicalFile
