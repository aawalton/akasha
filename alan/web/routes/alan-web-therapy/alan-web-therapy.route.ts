import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebTherapy = {
  id: "01a16fe6-4a3e-774b-8f7d-7042497c8967",
  type: "page-type/route",
  slug: "alan-web-therapy",
  definition: "the couples therapy sessions a signed-in reader is a person of",
  code: "tsx",
  urlPath: "therapy",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A session listed is a seat assigned couples therapy that states the reader.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A session listed is one the reader's access to seats reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each session listed leads to its seat's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader Google has not signed in is sent to the sign-in route.",
    },
  ],
  createdAt: "2026-10-24T21:52:05.693Z",
  updatedAt: "2026-10-24T21:52:05.693Z",
} as const satisfies Route
