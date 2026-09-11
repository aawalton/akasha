import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const devServerStating = {
  id: "01a06583-0030-7004-8711-a9cd6a8dbe3b",
  type: "module",
  slug: "dev-server-stating",
  definition: "the apps a dev server runs, and what a running one keeps on disk about itself",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The apps are the web app pages the index names.",
    },
    {
      invariantKind: "departure",
      statement: "An app no web app page is slugged for is a caller's mistake.",
    },
    {
      invariantKind: "departure",
      statement: "No dev server starts for a web app stating no base port.",
    },
    {
      invariantKind: "departure",
      statement: "A port is the app's base port plus the change number modulo a hundred.",
    },
    {
      invariantKind: "departure",
      statement: "A state file is written readable by its owner alone.",
    },
    {
      invariantKind: "departure",
      statement: "A state file with a field the shape does not name is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A directory that is not there yields no state rather than refusing.",
    },
    {
      invariantKind: "departure",
      statement: "Only a numbered directory under the projects root has dev server state.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here starts a dev server.",
    },
  ],
} as const satisfies Module
