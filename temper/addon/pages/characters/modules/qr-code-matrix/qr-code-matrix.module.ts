import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const qrCodeMatrix = {
  id: "01a0dea0-7728-7ed3-b242-dc87bb0e3978",
  type: "page-type/module",
  slug: "qr-code-matrix",
  definition: "the masked QR code matrix with the lowest penalty for a string of codeword bits",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A data cell holds 1 for dark and -1 for light once its mask is applied.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Of two masks with the same penalty the lower-numbered mask is kept.",
    },
  ],
} as const satisfies Module
