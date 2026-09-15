import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const webAppReading = {
  id: "01a05af7-5996-7000-9cf8-b27923a0672b",
  type: "module",
  slug: "web-app-reading",
  definition: "the workload a web app's page and the cluster service page it names represent",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A web app is named by the slug its page carries.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The page a slug names is the page the index answers for that slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A slug no web app page has is refused by name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A web app naming no cluster service is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A web app naming more than one cluster service is refused rather than chosen between.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A slug more than one cluster service page has is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The workload a cluster service is comes from that service's own page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The code emitting a cluster service's manifests sits beside the manifest page that service names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A cluster service naming a manifest no page carries is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page a value names is found by the slug alone, whatever page type names it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A manifest page whose code file is not there is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A web app's page states where its own source sits.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page short of the values a deploy rests on is refused by naming the values the page wants.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reaches the cluster.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here loads the code this module names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page's value is loaded from its own file rather than read through the index.",
    },
  ],
} as const satisfies Module
