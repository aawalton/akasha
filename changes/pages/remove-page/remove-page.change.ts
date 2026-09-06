import type { Change } from "../../change.page-type.ts"

export const removePage = {
  id: "01a07750-f2bb-7d0e-b301-cc3c2ede50b1",
  pageTypeSlug: "change",
  slug: "remove-page",
  definition: "one page taken away with every file that page keeps beside it",
  code: "ts",
  test: "ts",
  isCommand: false,
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
  guardSlugs: ["change-guard/relation-not-left-hanging", "change-guard/import-not-left-hanging"],
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
      statement: "One call of `remove-file` takes each file away.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal from `remove-file` refuses the whole removal.",
    },
    {
      invariantKind: "departure",
      statement: "Every index question here is asked of the shadow the caller hands in.",
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
      statement: "A path the shadow names no page at is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Containment is a relation named in the parent's `part-slugs`.",
    },
    {
      invariantKind: "departure",
      statement: "The parent naming the page in `part-slugs` is answered from that same shadow.",
    },
    {
      invariantKind: "gap",
      statement: "No change here drops the page's entry from the parent's `part-slugs`.",
    },
    {
      invariantKind: "gap",
      statement: "An answer here leaves the parent's entry for the relation guard to refuse.",
    },
    {
      invariantKind: "gap",
      statement: "`remove-property-value` is the change that will drop the parent's entry here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges whether a page may go.",
    },
    {
      invariantKind: "departure",
      statement: "A guard the change names judges whether a page may go.",
    },
  ],
} as const satisfies Change
