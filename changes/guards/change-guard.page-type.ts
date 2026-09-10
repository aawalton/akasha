import type { PageType } from "../../pages/types/page-type.page-type.ts"

export const changeGuard = {
  id: "01a07744-1310-721d-8751-4a3757cf2d90",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "change-guard",
  definition: "what judges the answer a change gives and says why that answer is refused",
  pluralSlug: "change-guards",
  extends: ["page-type/module"],
  parts: [
    "change-guard/claimed-file-not-left-behind",
    "change-guard/import-not-left-hanging",
    "change-guard/page-type-carries-no-pages",
    "change-guard/import-reaches-a-file",
    "change-guard/identity-not-already-held",
    "change-guard/relation-not-left-hanging",
    "change-guard/plural-slug-not-already-held",
    "change-guard/relation-reaches-a-page",
    "change-guard/field-key-not-carried-twice",
    "change-guard/folder-not-left-named",
    "change-guard/slug-names-one-property",
    "change-guard/generated-file-not-written",
  ],
  properties: [
    { pageProperty: "relation-property/change-target-type", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A guard judges the answer a change gives rather than the patch a landing leaves.",
    },
    {
      invariantKind: "departure",
      statement: "A guard is named by a mechanical change alone.",
    },
    {
      invariantKind: "departure",
      statement: "A check runs on a landable change alone.",
    },
    {
      invariantKind: "departure",
      statement: "A patch drops the pairing of a move.",
    },
    {
      invariantKind: "departure",
      statement: "A patch drops the body an edit followed.",
    },
    {
      invariantKind: "departure",
      statement: "A guard reads the files as the change leaves those files.",
    },
    {
      invariantKind: "departure",
      statement: "A guard reads the index as the change leaves that index.",
    },
    {
      invariantKind: "departure",
      statement: "A guard reads the committed index for a page the change takes away.",
    },
    {
      invariantKind: "departure",
      statement: "A guard unable to read the index refuses.",
    },
    {
      invariantKind: "departure",
      statement: "A shadow that will not build refuses the guard.",
    },
    {
      invariantKind: "departure",
      statement: "An empty list of references and an index that will not read are two verdicts.",
    },
    {
      invariantKind: "departure",
      statement:
        "A mechanical change names the guards that run over the composition reaching that change.",
    },
    {
      invariantKind: "departure",
      statement: "A mechanical change naming no guard says why that change names none.",
    },
    {
      invariantKind: "departure",
      statement: "A guard a composition's middle step would trip on belongs on no rung at all.",
    },
    {
      invariantKind: "departure",
      statement: "What no rung's guard can see is judged by a check at the landing.",
    },
  ],
  types: "ts",
} as const satisfies PageType
