import type { Module } from "../../../../code-system/modules/module.page-type.types.ts"

export const oauthConsent = {
  id: "01a0657c-604c-7001-97a9-2a69478eb550",
  pageTypeSlug: "module",
  type: "module",
  slug: "oauth-consent",
  definition: "the browser round trip a Google refresh token comes back from",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A minted refresh token is written into the workstation's secrets file.",
    },
    {
      invariantKind: "absence",
      statement: "A minted refresh token is answered to no caller.",
    },
    {
      invariantKind: "departure",
      statement: "What is answered is the name written and the file written into.",
    },
    {
      invariantKind: "departure",
      statement: "A caller that prints for itself is answered rather than printed for.",
    },
    {
      invariantKind: "departure",
      statement: "Consent a loopback server cannot receive is finished from a pasted callback URL.",
    },
    {
      invariantKind: "departure",
      statement: "The loopback server stops whether consent arrives or not.",
    },
    {
      invariantKind: "departure",
      statement: "An exchange answering with no refresh token is an operational fault.",
    },
  ],
} as const satisfies Module
