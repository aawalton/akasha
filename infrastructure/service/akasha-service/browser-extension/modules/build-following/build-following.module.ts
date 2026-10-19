import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const buildFollowing = {
  id: "01a15501-a45a-7e5b-bbc9-f92c85135eb5",
  type: "page-type/module",
  slug: "build-following",
  definition: "a browser extension reloading itself onto the build last put in its folder",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each deploy stamps the build it placed as `build.txt` in the folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An extension keeps the stamp it started on until it is reloaded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stamp on disk other than the one started on means a newer build is there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A newer build is looked for every minute and before the toolbar button acts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The minute's look reloads only while the extension says it is idle.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A press reloading the extension is acted on once the reload is done.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stamp that cannot be read reloads nothing.",
    },
  ],
  createdAt: "2026-10-19T16:32:13.401Z",
  updatedAt: "2026-10-19T16:32:13.401Z",
} as const satisfies Module
