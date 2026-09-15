import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const javascriptModule = {
  id: "01a06954-f7db-7006-ba1c-605a60e17fab",
  type: "page-type/page-type",
  slug: "javascript-module",
  definition: "code in the JavaScript language",
  parts: ["code-file-property/javascript"],
  extends: ["page-type/domain"],
  properties: [{ pageProperty: "code-file-property/javascript", required: true, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A JavaScript module's code is in a file beside the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "JavaScript runs under whatever runtime loads that JavaScript rather than under TypeScript's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A JavaScript module is written as the runtime loading that module reads that module.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The code carrying a JavaScript module to its runtime states the name that module lands under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A JavaScript module reaches its siblings by the name a sibling has where that sibling runs.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing in akasha imports a JavaScript module.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No check reading TypeScript reads a JavaScript module.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
