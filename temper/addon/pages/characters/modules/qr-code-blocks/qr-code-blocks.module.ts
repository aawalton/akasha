import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const qrCodeBlocks = {
  id: "01a0de9b-3c6f-7838-9b53-a5d239ec0593",
  type: "page-type/module",
  slug: "qr-code-blocks",
  definition: "the bytes each QR code version and error level holds and the blocks they split into",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The tables are the ones LibQRCode 1.0.8 carries, entry for entry.",
    },
  ],
} as const satisfies Module
