import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiDeviceSecretMint = {
  id: "01a08836-2978-7ffe-acee-194c3ed73a89",
  type: "page-type/route",
  slug: "alan-web-api-device-secret-mint",
  definition: "the secret a device carries afterwards",
  code: "ts",
  urlPath: "api/device-secret/mint",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller with no session and a caller with no access get the same 401 and body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every refusal is written to standard error with the reason for that refusal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Reaching the store is written to standard error too.",
    },
  ],
} as const satisfies Route
