import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const qrCodeDraw = {
  id: "01a0dea3-f90f-7b5b-b173-1f72e203cfe4",
  type: "page-type/module",
  slug: "qr-code-draw",
  definition: "the QR code a texture control shows for a string",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The texture turns white and its composite draws each run of dark cells as one black strip.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A texture drawn again reuses its composite and clears the strips it had.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A string is drawn at error level 2, as LibQRCode 1.0.8 draws it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The floating `/qrcode` window LibQRCode had is not ported.",
    },
  ],
} as const satisfies Module
