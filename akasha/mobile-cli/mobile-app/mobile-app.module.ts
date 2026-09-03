import type { Module } from "@akasha/code-system/module"

export const mobileApp = {
  id: "01a05cee-e560-793f-a803-19a1b3c458ac",
  pageTypeSlug: "module",
  slug: "mobile-app",
  definition: "an iOS app as stated on its ios-app page, with the repo paths it spells",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The ios-app pages read here are the TypeScript pages akasha carries.",
    },
    {
      invariantKind: "departure",
      statement: "An app is named by the slug its own page carries.",
    },
    {
      invariantKind: "departure",
      statement: "A script an app names by slug is answered as the file holding that script.",
    },
    {
      invariantKind: "departure",
      statement: "The map of iOS apps is read from disk only on the first call in a process.",
    },
    {
      invariantKind: "departure",
      statement: "An app carries where its own page is.",
    },
    {
      invariantKind: "departure",
      statement: "A repo path carrying no colon is taken to name the code repo.",
    },
    {
      invariantKind: "departure",
      statement: "The web-env-path a page states is kept as its slash-separated segments.",
    },
  ],
} as const satisfies Module
