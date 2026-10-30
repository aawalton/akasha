import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const handoverArrival = {
  id: "01a0bb44-e843-7fb1-8970-cb9a34941050",
  type: "page-type/module",
  slug: "handover-arrival",
  definition: "how a website takes a contributor through a handover",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A return path is read as a path of the peripheral's own or thrown away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A return path naming the landing path or the sign-in path is thrown away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A code taken as nobody sends the person back to alanwalton.com rather than signing anyone in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The cookie is set on the redirect that carries the person to the return path.",
    },
  ],
  createdAt: "2026-09-19T20:04:10.435Z",
  updatedAt: "2026-10-30T15:49:30.076Z",
} as const satisfies Module
