import type { Module } from "@akasha/code-system/module"

export const surplusFallTier = {
  id: "01a0697e-ded3-7adb-9d6e-f852cfc9ffd7",
  pageTypeSlug: "module",
  slug: "surplus-fall-tier",
  definition:
    "the five colours a surplus reading is placed in, and whether today has gone below its open",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The scale climbs from black through blue.",
    },
    {
      invariantKind: "departure",
      statement: "A colour nearer black is the worse one.",
    },
    {
      invariantKind: "departure",
      statement: "A reading beneath the lowest rung is black rather than no colour.",
    },
    {
      invariantKind: "departure",
      statement: "A fall is a colour now beneath the colour the day opened at.",
    },
    {
      invariantKind: "constraint",
      statement: "The colours are named here without importing anything.",
    },
    {
      invariantKind: "constraint",
      statement: "A colour is worked out without reaching a store.",
    },
  ],
} as const satisfies Module
