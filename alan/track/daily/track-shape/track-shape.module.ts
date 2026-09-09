import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const trackShape = {
  id: "01a069d7-ba37-75fb-8dbd-6f5be522dda9",
  pageTypeSlug: "module",
  type: "module",
  slug: "track-shape",
  definition: "the shape a tracking row is turned into as it is landed",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This module states the shape a day takes as data rather than as a converter.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file.",
    },
    {
      invariantKind: "departure",
      statement: "A frontmatter key this module does not name is refused rather than dropped.",
    },
    {
      invariantKind: "departure",
      statement: "A day becomes one page and its frontmatter keys become that page's properties.",
    },
    {
      invariantKind: "departure",
      statement: "A day's keys are kebab in the markdown and camel on the page.",
    },
    {
      invariantKind: "departure",
      statement: "A day's two jsonl sidecars become entry properties beside the day page.",
    },
    {
      invariantKind: "departure",
      statement: "A row beside an akasha day page spells its keys camel.",
    },
    {
      invariantKind: "departure",
      statement: "A row beside a markdown day keeps its kebab keys.",
    },
    {
      invariantKind: "absence",
      statement: "No import path for a day page's declaring type is stated here.",
    },
    {
      invariantKind: "departure",
      statement:
        "The path a day page imports its type from is asked of akasha rather than stated here.",
    },
    {
      invariantKind: "constraint",
      statement: "A wrong type-only import loads fine and fails only a typecheck.",
    },
    {
      invariantKind: "departure",
      statement: "A day's page type name in akasha and its name in the markdown are two names.",
    },
    {
      invariantKind: "departure",
      statement: "A day page looked up under the markdown page type name is refused by the index.",
    },
    {
      invariantKind: "departure",
      statement: "A day's identity is kept where that identity is already a uuid version 7.",
    },
    {
      invariantKind: "departure",
      statement: "A day's identity is minted afresh where that identity is no uuid version 7.",
    },
    {
      invariantKind: "departure",
      statement: "A day's slug is that day's date with `day-` on the front.",
    },
    {
      invariantKind: "departure",
      statement: "A day with no slug takes one minted from that day's date.",
    },
    {
      invariantKind: "departure",
      statement: "A day's page type key names the page type this module states.",
    },
    {
      invariantKind: "departure",
      statement: "A field's `key` is the markdown's key and its `name` is the page's key.",
    },
    {
      invariantKind: "departure",
      statement: "The fields are in the order the rendered page states them.",
    },
    {
      invariantKind: "departure",
      statement: "Text that reads as a number is carried across as the text it is.",
    },
    {
      invariantKind: "departure",
      statement: "A day key and a row key of one name have one type.",
    },
    {
      invariantKind: "departure",
      statement: "A day whose identity is re-minted has its rows re-pointed.",
    },
    {
      invariantKind: "departure",
      statement: "Re-pointing the day is the only edit a row takes.",
    },
    {
      invariantKind: "departure",
      statement:
        "A day's keys and the page type's declared properties are two lists that may drift apart.",
    },
  ],
} as const satisfies Module
