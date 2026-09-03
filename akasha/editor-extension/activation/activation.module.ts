import type { Module } from "../../code-system/modules/module.page-type.ts"

export const activation = {
  id: "01a064e4-627c-7eb1-ba44-da0dfc4df542",
  pageTypeSlug: "module",
  slug: "activation",
  definition: "each start run on its own to a deadline and the outcome that start reaches",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A start that fails leaves every other start running.",
    },
    {
      invariantKind: "departure",
      statement: "Every start begins at once rather than one after another.",
    },
    {
      invariantKind: "departure",
      statement: "The deadline ends the waiting rather than the start.",
    },
    {
      invariantKind: "departure",
      statement: "A start still running at the deadline is left running.",
    },
    {
      invariantKind: "departure",
      statement: "A start still running at the deadline is reported as taking the whole deadline.",
    },
    {
      invariantKind: "departure",
      statement: "A start that fails is reported with the message the failure carried.",
    },
    {
      invariantKind: "departure",
      statement: "A failure that is no Error is reported as the text the failure prints as.",
    },
    {
      invariantKind: "departure",
      statement: "Every start is logged as the start activates or as the start fails.",
    },
    {
      invariantKind: "departure",
      statement: "A start passing the deadline is logged once with the deadline named.",
    },
    {
      invariantKind: "departure",
      statement: "No answer is a symbol rather than a value a start could answer with.",
    },
    {
      invariantKind: "departure",
      statement: "The timer is cleared whether the answer arrived or the deadline came first.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows what a start does.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows where a logged line goes.",
    },
  ],
} as const satisfies Module
