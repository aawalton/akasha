import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const reExecAskState = {
  id: "01a0d4cf-9736-7294-8e49-079e6191ba26",
  type: "page-type/page-type",
  slug: "re-exec-ask-state",
  definition:
    "whether a supervisor reads the request of a seat that wants the supervisor restarted",
  extends: ["page-type/page"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A request is asked until its supervisor takes it up, and taken from then on.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-24T19:06:09.590Z",
  updatedAt: "2026-10-30T14:46:43.052Z",
} as const satisfies PageType
