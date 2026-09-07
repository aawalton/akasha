import type { Module } from "../../code-system/modules/module.page-type.ts"
import type { PageType } from "../../pages/types/page-type.page-type.ts"

export type ChangeGuard = Module

export const changeGuard = {
  id: "01a07744-1310-721d-8751-4a3757cf2d90",
  pageTypeSlug: "page-type",
  slug: "change-guard",
  definition: "what judges the answer a change gives and says why that answer is refused",
  pluralSlug: "change-guards",
  extendsSlug: ["page-type/module"],
  partSlugs: [
    "change-guard/body-not-written-over",
    "change-guard/import-not-left-hanging",
    "change-guard/import-reaches-a-file",
    "change-guard/identity-not-already-held",
    "change-guard/relation-not-left-hanging",
    "change-guard/plural-slug-not-already-held",
    "change-guard/relation-reaches-a-page",
    "change-guard/field-key-not-carried-twice",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A guard judges the answer a change gives rather than the patch a landing leaves.",
    },
    {
      invariantKind: "departure",
      statement: "A guard runs on a mechanical change alone.",
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
      statement: "A mechanical change names the guards that run on that change.",
    },
  ],
} as const satisfies PageType
