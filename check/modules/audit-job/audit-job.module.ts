import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const auditJob = {
  id: "01a0aaca-8cb9-701a-98aa-f28b5baab1be",
  type: "page-type/module",
  slug: "audit-job",
  definition: "an audit round run as a job in the cluster at the commit that round answers for",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A round that runs in the cluster runs as a job of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A job is named for the commit it answers for and the checks it runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two rounds over one commit and one set of checks are one job.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The checks a job runs are named in one order however the caller named them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A job runs the audit command over the checks it is named for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The command the job runs is asked of the index rather than spelled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A round fetches the commit it answers for and no commit before it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A round is waited on for as long as the pod running it is given.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a round found is read from the verdicts rather than from what the job said.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A round that found refusals ends the job well, a refusal being no failure.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A job that failed is one whose checkout or install would not run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A check the job left no verdict for is left out rather than answered clean.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here runs a check.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here composes the pod a job starts.",
    },
  ],
} as const satisfies Module
