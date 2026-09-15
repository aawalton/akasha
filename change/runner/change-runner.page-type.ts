import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const changeRunner = {
  id: "01a077c2-3a15-7c14-8900-ecb0624ff450",
  type: "page-type",
  slug: "change-runner",
  definition: "a module running a change named by the address that change is filed under",
  parts: [
    "change-runner/agent-change-running",
    "change-runner/mechanical-change-running",
    "change-runner/test-change-running",
    "file-property/addressed",
    "module/change-loading",
    "relation-property/reached",
  ],
  extends: ["page-type/module"],
  properties: [
    { pageProperty: "file-property/addressed", required: true, many: false },
    { pageProperty: "relation-property/reached", required: true, many: false },
  ],
  typeGenerator: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A runner is handed the address a change is filed under.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A runner reaches the changes of that runner's page type and of the page types under that type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The map beside a runner has the addresses that runner reaches and no other address.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The map beside a runner is written by the generator this page type states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An address and the file it names are written as quoted literals are.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A runner reads the page filed at that address off the index.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A runner loads the change's code from the path that page states.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A change reaches another change through a runner rather than through an import.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads an argument off the command line.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
