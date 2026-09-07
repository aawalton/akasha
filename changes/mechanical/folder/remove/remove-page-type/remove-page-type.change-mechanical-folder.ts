import type { ChangeMechanicalFolder } from "../../change-mechanical-folder.page-type.ts"

export const removePageType = {
  id: "01a0783a-11c0-7708-a1a5-f138cd15644b",
  pageTypeSlug: "change-mechanical-folder",
  slug: "remove-page-type",
  changeModeSlug: "change-mode-remove",
  changeTargetTypeSlug: "change-target-type/folder",
  changeTargetSubtypeSlug: "change-target-subtype/folder",
  definition: "one page type taken away with every file that page type keeps beside it",
  code: "ts",
  test: "ts",
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
  guardSlugs: [
    "change-guard/relation-not-left-hanging",
    "change-guard/import-not-left-hanging",
    "change-guard/page-type-carries-no-pages",
  ],
  invariants: [
    {
      invariantKind: "absence",
      statement: "No page of the page type is taken away here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads which pages the page type is the page type of.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type and every file that page type keeps beside the page type go together.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which files sit beside a page type is read from the index rather than from the folder.",
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
      statement: "A path the world names no page type at is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Containment is a relation named in the parent's `part-slugs`.",
    },
    {
      invariantKind: "departure",
      statement:
        "The parent naming the page type in `part-slugs` is answered from that same world.",
    },
    {
      invariantKind: "departure",
      statement:
        "The page type's entry in the parent's `part-slugs` is dropped by `remove-property-value`.",
    },
    {
      invariantKind: "departure",
      statement:
        "A parent naming the page type bare rather than qualified is dropped just the same.",
    },
    {
      invariantKind: "departure",
      statement: "The guards named here run over the answer before that answer comes back.",
    },
    {
      invariantKind: "departure",
      statement: "A guard refusing refuses the removal.",
    },
  ],
} as const satisfies ChangeMechanicalFolder
