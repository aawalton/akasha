import type { Command } from "../command.page-type.ts"

export const deploy = {
  id: "01a05af7-5996-7002-bc83-446645b7de16",
  pageTypeSlug: "command",
  slug: "deploy",
  definition: "the command putting up the web app a page describes",
  code: "ts",
  test: "ts",
  taking: [
    { said: "<slug>", takes: "the web app to put up, named by the slug its page carries" },
    { said: "--dry-run", takes: "say what would be applied and change nothing" },
  ],
  helpNotes: [
    "one call names one web app, and a second name is refused rather than chosen between.",
    "what the deploy is made of is not on the call: the page names a cluster service, that page names a workload, and the code beside it emits the manifests.",
    "the namespace stands first, then what is placed in it, then the workload that reads it.",
    "a manifest the cluster already stands as is applied again by nothing, so a second call does nothing.",
    "the build a pod serves is not made here, so a web app is put up at the build its pod already holds.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A deploy names one web app.",
    },
    {
      invariantKind: "departure",
      statement: "What a deploy is made of is read from the page rather than said on the call.",
    },
    {
      invariantKind: "departure",
      statement: "A page leaving which workload is meant unsettled is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A cluster already standing as the page describes is applied nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A dry run reports the same plan the run would carry out.",
    },
    {
      invariantKind: "departure",
      statement: "A kubectl that refuses makes the call refuse.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here puts up a service the cluster does not run as a workload.",
    },
    {
      invariantKind: "gap",
      statement: "A web app is built from its source before it is put up.",
    },
  ],
} as const satisfies Command
