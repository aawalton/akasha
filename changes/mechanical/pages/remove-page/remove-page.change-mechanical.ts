import type { ChangeMechanical } from "../../change-mechanical.page-type.ts"

export const removePage = {
  id: "01a07750-f2bb-7d0e-b301-cc3c2ede50b1",
  pageTypeSlug: "change-mechanical",
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
      invariantKind: "departure",
      statement: "The guards named here run over the answer before that answer comes back.",
    },
    {
      invariantKind: "departure",
      statement: "A guard refusing refuses the removal.",
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
      statement: "The guards named here are imported rather than reached through `guard-slugs`.",
    },
  ],
} as const satisfies ChangeMechanical
