import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const smsConsent = {
  id: "01a05b54-a902-76be-b1e3-8d624a488ea5",
  type: "module",
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
    {
      invariantKind: "departure",
      statement:
        "The wording a version names is the whole sentence shown, links read as their own words.",
    },
  ],
} as const satisfies Module
