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
    "the build a pod serves is made here, inside that pod, from the commit HEAD stands at.",
    "a pod takes its source from origin, so a commit origin does not carry is pushed onto main first.",
    "that commit is first proved to install from the manifests it tracks, since a workspace resolving on a workstation can be missing from git.",
    "a build already made from that commit is made again by nothing.",
    "what a build needs set is exported beside the manifest code, and a value it names that nothing holds refuses the call.",
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
      statement: "A web app is built from its source before it is put up.",
    },
    {
      invariantKind: "departure",
      statement: "The source built is the commit the workstation's HEAD stands at.",
    },
    {
      invariantKind: "departure",
      statement: "The commit built is proved to install before anything is pushed.",
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
      statement: "A commit origin does not carry is pushed onto main before the pod builds it.",
    },
    {
      invariantKind: "departure",
      statement: "A push origin refuses makes the call refuse before anything is built.",
    },
    {
      invariantKind: "departure",
      statement: "A build already made from that commit is made again by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A value the build needs that nothing holds is refused before anything is pushed.",
    },
    {
      invariantKind: "departure",
      statement: "A value the build needs is reported by its name rather than by what it holds.",
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
      invariantKind: "departure",
      statement: "A change standing only in the worktree is not built.",
    },
    {
      invariantKind: "gap",
      statement: "The commit pushed carries only the web app being put up.",
    },
  ],
} as const satisfies Command
