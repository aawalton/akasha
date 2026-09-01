import type { Module } from "@akasha/code-system/module"

export const webAppReading = {
  id: "01a05af7-5996-7000-9cf8-b27923a0672b",
  pageTypeSlug: "module",
  slug: "web-app-reading",
  definition: "the workload a web app's page and the cluster service page it names stand for",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A web app is named by the slug its page carries.",
    },
    {
      invariantKind: "departure",
      statement: "A slug no web app page carries is refused by name.",
    },
    {
      invariantKind: "departure",
      statement: "A web app naming no cluster service is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A web app naming more than one cluster service is refused rather than chosen between.",
    },
    {
      invariantKind: "departure",
      statement: "A slug more than one cluster service page carries is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The workload a cluster service is comes from that service's own page.",
    },
    {
      invariantKind: "departure",
      statement: "The code emitting a cluster service's manifests is the file its page names.",
    },
    {
      invariantKind: "departure",
      statement: "A cluster service page naming manifest code no file stands at is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A web app's page states where its own source stands.",
    },
    {
      invariantKind: "departure",
      statement: "A page short of what a deploy rests on is refused by naming what the page wants.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the cluster.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here loads the code this module names.",
    },
    {
      invariantKind: "departure",
      statement: "A page's value is loaded from its own file rather than read through the index.",
    },
  ],
} as const satisfies Module
