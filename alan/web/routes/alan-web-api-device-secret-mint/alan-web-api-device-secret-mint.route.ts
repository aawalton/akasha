import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const alanWebApiDeviceSecretMint = {
  id: "01a08836-2978-7ffe-acee-194c3ed73a89",
  pageTypeSlug: "route",
  type: "route",
  slug: "alan-web-api-device-secret-mint",
  definition: "the secret one device carries afterwards",
  code: "ts",
  urlPath: "api/device-secret/mint",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A caller with no session and a caller with no access get the same 401 and body.",
    },
    {
      invariantKind: "departure",
      statement: "Every refusal is written to standard error with the reason for it.",
    },
    {
      invariantKind: "departure",
      statement: "Reaching the store is written to standard error too.",
    },
  ],
} as const satisfies Route
