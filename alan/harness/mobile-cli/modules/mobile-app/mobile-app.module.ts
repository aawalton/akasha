import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mobileApp = {
  id: "01a05cee-e560-793f-a803-19a1b3c458ac",
  type: "module",
  slug: "mobile-app",
  definition: "an iOS app as stated on its ios-app page, with the repo paths it spells",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The ios-app pages read here are the TypeScript pages akasha has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An app is named by the slug its own page carries.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An app slug no page carries is answered as a refusal as well as thrown.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A script an app names by slug is answered as the file holding that script.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The map of iOS apps is read from disk only on the first call in a process.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An app carries where its own page is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A repo path with no colon is taken to name the code repo.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The web-env-path a page states is kept as its slash-separated segments.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whether an app bakes a ring credential is read from the scripts its page names.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No app slug is written here to say which app bakes a ring credential.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page naming two ring credential scripts is refused rather than answered by the first.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The page carrying a script's slug is asked of the index rather than swept for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The file holding a script is the `shell` file beside that script's page.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No file name ending is spelled here to find a script.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An app carries the file making its native sources as well as the file building it.",
    },
  ],
} as const satisfies Module
