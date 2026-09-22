import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const subagentPagesTaking = {
  id: "01a0c9f2-dbe9-776d-947e-d3b4926ce4b5",
  type: "page-type/module",
  slug: "subagent-pages-taking",
  definition: "the subagent pages under a seat swept away when that seat is done with them",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The page a seat sits at is read from the index rather than composed from a name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A sweep reaches only the pages the module naming a page says are under that seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sweep leaves a page whose subagent the transcript names as running.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A sweep takes a page it could read nothing for, where a take-down leaves that page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sweep is where a page no take-down would take is reclaimed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "What each page under a seat has beside it moves onto the seat before that page goes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat the index has no page for sweeps its pages without moving anything.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sweep is asked of the pages service rather than landed here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The origin that ask reaches is the origin a message send reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write names its writer as a name and an address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The files beside a page the ask took are taken here rather than in that ask.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sweep drops the readings of the pages the sweep took.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sweep the pages refused leaves every page where that page is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The reading a sweep judges by is handed in rather than reached for.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here lands a commit.",
    },
  ],
} as const satisfies Module
