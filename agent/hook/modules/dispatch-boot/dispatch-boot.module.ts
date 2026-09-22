import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dispatchBoot = {
  id: "01a0cab0-a954-7002-aa7c-49cccf78b92c",
  type: "page-type/module",
  slug: "dispatch-boot",
  definition: "the dispatch read from the commit HEAD names rather than from the checkout",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The commit read is the one HEAD names as the hook runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The loader is put in place before the dispatch is imported.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The dispatch is imported by the package name, so the loader claims it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The dispatch is handed the checkout root rather than working it out again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The dispatch is handed the commit only where the loader is in place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A dispatch exporting no run is run as a process out of the checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Trouble of any sort runs the dispatch as a process out of the checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The checkout is found from this file's real path rather than from the link's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What this file imports is read from the checkout rather than from the commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "What this file imports is kept few, since that is what the commit does not cover.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here judges.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No hook is named here.",
    },
  ],
} as const satisfies Module
