import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setTemplatesReading = {
  id: "01a0de32-9635-7c38-a44b-a268b1083d65",
  type: "page-type/module",
  slug: "set-templates-reading",
  definition: "the reading of the sets a character build takes from set pages",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A set is at the build-hash place its page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A set's category, class, metric and buff are read as the key of the page named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page naming a page that states no key throws rather than reading a set.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bonus stating no effect is read with no effect.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bonus effect of a type the effect union lacks is read as an unknown effect.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An unknown bonus effect carries the description its bonus states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The buffs a bonus effect holds while up are read as the keys of the pages named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing here reads a file, so a browser and a server read sets alike.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A set category's name and display order are read off its page with its key.",
    },
  ],
  createdAt: "2026-09-26T14:50:52.341Z",
  updatedAt: "2026-10-20T17:35:46.057Z",
} as const satisfies Module
