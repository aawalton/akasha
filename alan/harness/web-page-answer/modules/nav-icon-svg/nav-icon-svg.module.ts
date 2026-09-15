import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const navIconSvg = {
  id: "01a0640f-8510-721d-88b0-b37b2bda4681",
  type: "page-type/module",
  slug: "nav-icon-svg",
  definition: "a navigation icon drawn as svg text",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An icon name the set does not have is drawn as a page of text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every attribute value is escaped before the value reaches the markup.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An icon is loaded only when the icon is drawn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How heavy a stroke a site draws its icons with is passed in.",
    },
  ],
} as const satisfies Module
