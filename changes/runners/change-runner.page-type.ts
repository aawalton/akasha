import type { Module } from "../../code-system/modules/module.page-type.ts"
import type { PageType } from "../../pages/types/page-type.page-type.ts"
import type { Addressed } from "./properties/addressed.file-property.ts"
import type { Reached } from "./properties/reached.relation-property.ts"

export type ChangeRunner = Module & {
  addressed: Addressed
  reached: Reached
}

export const changeRunner = {
  id: "01a077c2-3a15-7c14-8900-ecb0624ff450",
  pageTypeSlug: "page-type",
  slug: "change-runner",
  definition: "a module running a change named by the address that change is filed under",
  pluralSlug: "change-runners",
  parts: [
    "change-runner/agent-change-running",
    "change-runner/mechanical-change-running",
    "module/change-loading",
    "file-property/addressed",
    "relation-property/reached",
  ],
  extends: ["page-type/module"],
  properties: [
    { pageProperty: "file-property/addressed", required: true, many: false },
    { pageProperty: "relation-property/reached", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A runner is handed the address a change is filed under.",
    },
    {
      invariantKind: "departure",
      statement:
        "A runner reaches the changes of the page type that runner names and of the page types under it.",
    },
    {
      invariantKind: "departure",
      statement: "The map beside a runner has the addresses that runner reaches and no other.",
    },
    {
      invariantKind: "departure",
      statement: "A runner reads the page filed at that address off the index.",
    },
    {
      invariantKind: "departure",
      statement: "A runner loads the change's code from the path that page states.",
    },
    {
      invariantKind: "departure",
      statement:
        "A runner runs the guards that page names and the guards the changes reached inside name.",
    },
    {
      invariantKind: "departure",
      statement: "A guard runs on the outermost change's answer rather than on each rung's answer.",
    },
    {
      invariantKind: "gap",
      statement: "A change reaches another change through a runner rather than through an import.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads an argument off the command line.",
    },
  ],
} as const satisfies PageType
