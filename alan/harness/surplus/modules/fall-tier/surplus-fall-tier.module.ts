import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const surplusFallTier = {
  id: "01a0697e-ded3-7adb-9d6e-f852cfc9ffd7",
  type: "page-type/module",
  slug: "surplus-fall-tier",
  definition: "a tier's color order, and whether today has gone below its opening color",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The scale climbs from black through blue.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading nearer black is the worse reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fall is a colour now beneath the colour the day opened at.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The colors are the readout tier's own rather than a second set of colors.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A colour is worked out without reaching a store.",
    },
  ],
} as const satisfies Module
