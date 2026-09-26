import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const qrCodePatterns = {
  id: "01a0de9f-412c-7189-8885-0722986bb7f5",
  type: "page-type/module",
  slug: "qr-code-patterns",
  definition: "the fixed finder, timing, alignment, format and version cells of a QR code matrix",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A matrix holds 2 for a fixed dark cell, -2 for a fixed light cell and 0 for data.",
    },
  ],
} as const satisfies Module
