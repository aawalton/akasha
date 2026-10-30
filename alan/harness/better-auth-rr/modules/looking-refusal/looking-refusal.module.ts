import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lookingRefusal = {
  id: "01a18da3-6114-74af-a9ba-f91015e1f9f8",
  type: "page-type/module",
  slug: "looking-refusal",
  definition: "how code rejects a request that changes something from a browser that looks",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A browser signed in as a person other than Alan only looks.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A session marked to look only is refused every request but a get, a head or an options.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A post to a path the server names as a read is let through as a get is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That refusal is made before the request reaches any route.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A request with nobody signed in is left to the route to refuse.",
    },
  ],
  createdAt: "2026-10-30T16:27:37.106Z",
  updatedAt: "2026-10-30T16:27:37.106Z",
} as const satisfies Module
