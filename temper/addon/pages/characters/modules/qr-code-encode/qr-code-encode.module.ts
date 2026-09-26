import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const qrCodeEncode = {
  id: "01a0dea1-68fa-7d13-b0c0-5f37fad2e44f",
  type: "page-type/module",
  slug: "qr-code-encode",
  definition: "the QR code matrix a string encodes to",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A string encodes to the matrix LibQRCode 1.0.8 gives it, cell for cell, including its quirks.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The smallest version holding the string is chosen at the error level asked for.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No global is set, so the `qrcode` global LibQRCode left is gone.",
    },
  ],
} as const satisfies Module
