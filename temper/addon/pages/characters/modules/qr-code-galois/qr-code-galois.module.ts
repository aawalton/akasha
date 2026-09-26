import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const qrCodeGalois = {
  id: "01a0de9e-3aef-7485-9742-542763552a73",
  type: "page-type/module",
  slug: "qr-code-galois",
  definition: "the Reed-Solomon error-correction bytes a QR code data block carries",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The log and antilog tables and generator polynomials are the ones LibQRCode 1.0.8 carries.",
    },
  ],
} as const satisfies Module
