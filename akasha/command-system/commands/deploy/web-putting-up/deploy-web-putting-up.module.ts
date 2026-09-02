import type { Module } from "@akasha/code-system/module"

export const deployWebPuttingUp = {
  id: "01a05f90-94a7-7038-a602-193e6370fbac",
  pageTypeSlug: "module",
  slug: "deploy-web-putting-up",
  definition: "the web app a deploy names, put up onto the cluster its page describes",
  code: "ts",
  test: "ts",
  invariants: [
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
      statement: "A web app is built from its source before that web app is put up.",
    },
    {
      invariantKind: "departure",
      statement: "The source built is the commit the workstation's HEAD stands at.",
    },
    {
      invariantKind: "departure",
      statement: "The commit built is proved to install before anything is applied.",
    },
    {
      invariantKind: "departure",
      statement:
        "An install is proved against the manifests the commit tracks rather than against the worktree.",
    },
    {
      invariantKind: "departure",
      statement: "A commit whose tracked manifests do not install refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "A commit origin main does not carry refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing is applied and nothing is built before origin main carries the commit.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names the commit and the push that would land the commit.",
    },
    {
      invariantKind: "departure",
      statement: "A build already made from that commit is made again by nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A value the build needs that nothing holds is refused before anything is applied.",
    },
    {
      invariantKind: "departure",
      statement:
        "A value the build needs is reported by its name rather than by what the value holds.",
    },
    {
      invariantKind: "departure",
      statement: "A kubectl that refuses makes the call refuse.",
    },
    {
      invariantKind: "departure",
      statement: "A change standing only in the worktree is not built.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here puts up a service the cluster does not run as a workload.",
    },
  ],
} as const satisfies Module
