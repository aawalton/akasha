import type { Module } from "@akasha/code-system/module"

export const smsConsent = {
  id: "01a05b54-a902-76be-b1e3-8d624a488ea5",
  pageTypeSlug: "module",
  slug: "sms-consent",
  definition: "what a person agrees to in opting in to text messages",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The consent a person gave is known by the version of the wording the person saw.",
    },
    {
      invariantKind: "departure",
      statement: "A change to the wording is a new version.",
    },
    {
      invariantKind: "departure",
      statement: "The wording says how to stop.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here records who agreed.",
    },
  ],
} as const satisfies Module
