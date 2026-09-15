import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const routerAppCode = {
  id: "01a08e07-d3c0-7687-a361-081c6e367ee5",
  type: "module",
  slug: "router-app-code",
  definition: "how a check reads the code a router app's package holds",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A router app's package is the folder that app's page sits in.",
    },
    {
      invariantKind: "departure",
      statement: "The folders the router apps sit in are worked out once and held for one index.",
    },
    {
      invariantKind: "departure",
      statement: "Which modules a file names is read from the strings that file spells.",
    },
    {
      invariantKind: "departure",
      statement: "A server-only module's name closes with `.server` before its extension.",
    },
    {
      invariantKind: "departure",
      statement: "A module under a `.server` folder is server-only too.",
    },
    {
      invariantKind: "departure",
      statement:
        "The paths judged under a router app are the changed paths that app's folder holds.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change to a router app's page or route table widens those to every path under that app.",
    },
    {
      invariantKind: "departure",
      statement: "Those paths are the files the overlay lists under that app's folder.",
    },
    {
      invariantKind: "departure",
      statement: "A folder is listed as the change leaves that folder.",
    },
    {
      invariantKind: "departure",
      statement: "A folder that is nowhere on disk holds no path.",
    },
    {
      invariantKind: "departure",
      statement: "The overlay's one listing of the tree is what each app's folder is read from.",
    },
    {
      invariantKind: "absence",
      statement: "No folder under an app is walked to reach the files beneath it.",
    },
    {
      invariantKind: "departure",
      statement: "A path named for no TypeScript file is left out of them.",
    },
  ],
} as const satisfies Module
