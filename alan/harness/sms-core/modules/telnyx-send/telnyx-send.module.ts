import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const telnyxSend = {
  id: "01a05b6f-999d-731e-a182-ed95ac7ecc35",
  type: "module",
  slug: "telnyx-send",
  definition: "one outgoing message put into the request Telnyx wants and the answer read back",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here sends the request this module builds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The api key rides in the authorization header.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An answer the shape refuses is reported rather than thrown.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller may point the request at somewhere other than Telnyx.",
    },
  ],
} as const satisfies Module
