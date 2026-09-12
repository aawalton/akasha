import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const mobileApp = {
  id: "01a05cee-e560-793f-a803-19a1b3c458ac",
  type: "module",
  slug: "mobile-app",
  definition: "an iOS app as stated on its ios-app page, with the repo paths it spells",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The ios-app pages read here are the TypeScript pages akasha has.",
    },
    {
      invariantKind: "departure",
      statement: "An app is named by the slug its own page carries.",
    },
    {
      invariantKind: "departure",
      statement: "An app slug no page carries is answered as a refusal as well as thrown.",
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
      statement: "A repo path with no colon is taken to name the code repo.",
    },
    {
      invariantKind: "departure",
      statement: "The web-env-path a page states is kept as its slash-separated segments.",
    },
    {
      invariantKind: "departure",
      statement: "Whether an app bakes a ring credential is read from the scripts its page names.",
    },
    {
      invariantKind: "absence",
      statement: "No app slug is written here to say which app bakes a ring credential.",
    },
    {
      invariantKind: "departure",
      statement: "The page carrying a script's slug is asked of the index rather than swept for.",
    },
    {
      invariantKind: "departure",
      statement: "The file holding a script is the `shell` file beside that script's page.",
    },
    {
      invariantKind: "absence",
      statement: "No file name ending is spelled here to find a script.",
    },
    {
      invariantKind: "departure",
      statement:
        "An app carries the file making its native sources as well as the file building it.",
    },
  ],
} as const satisfies Module
