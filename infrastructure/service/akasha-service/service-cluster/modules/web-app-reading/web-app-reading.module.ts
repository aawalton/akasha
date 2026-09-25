import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const webAppReading = {
  id: "01a05af7-5996-7000-9cf8-b27923a0672b",
  type: "page-type/module",
  slug: "web-app-reading",
  definition: "the workload a web app's page and the cluster service page it names represent",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A web app is named by the slug its page carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page a slug names is the page the index answers for that slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug no web app page has is refused by name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A web app naming no cluster service is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A web app naming more than one cluster service is refused rather than chosen between.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug more than one cluster service page has is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The workload a cluster service is comes from that service's own page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The code emitting a cluster service's manifests sits beside the manifest page that service names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cluster service naming a manifest no page carries is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cluster service stating a manifests file is applied as that file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A manifests file that is not there is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cluster service stating no manifests file and naming no manifest is refused.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "A cluster service naming more than one manifest is refused, a web app being one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page a value names is found by the slug alone, whatever page type names it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A manifest page whose code file is not there is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A web app's page states where its own source sits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page short of the values a deploy rests on is refused by naming the values the page wants.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the cluster.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here loads the code this module names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page's value is loaded from its own body rather than read through the index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every page and file is read from the pages a caller hands in, a commit's or a checkout's.",
    },
  ],
} as const satisfies Module
