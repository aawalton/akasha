import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsLocInstallLocalization = {
  id: "01a061d7-7bb9-7125-b72f-e3bd28b4db73",
  type: "page-type/module",
  slug: "sets-loc-install-localization",
  definition: "the German and English tables made into the library's localization",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The localization table is created here with German and English alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The on and off labels are placed on the fallback language alone.",
    },
  ],
} as const satisfies Module
