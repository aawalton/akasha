import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const hostAnswering = {
  id: "01a0d96d-da99-7c7a-9861-e432d259f5f8",
  type: "page-type/module",
  slug: "host-answering",
  definition: "whether each web app answers over the web at every host name routed to it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every web app page is watched.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A web app is reached at each host name a route sends to the workload its cluster service states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A route sending to any other workload is no route to that web app.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each host name is asked for its root once, over HTTPS, following no redirect.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A host name answering below 500 is well, whatever that answer says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A host name answering 500 or above, or not answering, is broken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A web app is broken with the first host name found broken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A web app no route reaches is broken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A web app whose page names no workload a deploy could put up is broken.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here asks the cluster whether the workload's pods are ready.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a verdict.",
    },
  ],
} as const satisfies Module
