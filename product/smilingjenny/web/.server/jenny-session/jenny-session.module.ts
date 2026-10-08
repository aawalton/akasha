import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const jennySession = {
  id: "01a06558-c2cc-700d-928b-e34abee70b6c",
  type: "page-type/module",
  slug: "jenny-session",
  definition: "who a request is served as, and where a caller signed in as nobody is sent",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A request is read as the contributor this site's own handover cookie names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A contributor is let in where the person naming that contributor is Jenny or Alan.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Anybody else is nobody here, whoever they are elsewhere.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller carrying no cookie is sent to sign in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller signed in as somebody else is refused rather than sent round again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a refused caller is told is said on the site's home document.",
    },
  ],
  createdAt: "2026-09-03T03:38:30.988Z",
  updatedAt: "2026-09-27T12:25:16.000Z",
} as const satisfies Module
