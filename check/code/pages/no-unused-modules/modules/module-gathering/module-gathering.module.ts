import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const moduleGathering = {
  id: "01a0c660-9eed-7000-bf49-551a02837b43",
  type: "page-type/module",
  slug: "module-gathering",
  definition: "the modules a change names, and the files each of those modules holds",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A file whose name carries a module's page type names that module.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A module's own files are the files beside its page carrying that page's name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Those files are read from the overlay's listing rather than from the disk.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The listing is read once for the whole tree rather than once for each module.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A module page the change takes away is gathered by nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A module several files of one change name is gathered once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which page types are pages is read from the index rather than listed here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here judges whether anything reaches a module.",
    },
  ],
} as const satisfies Module
