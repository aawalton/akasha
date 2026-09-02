import type { Command } from "../command.page-type.ts"

export const deploy = {
  id: "01a05af7-5996-7002-bc83-446645b7de16",
  pageTypeSlug: "command",
  slug: "deploy",
  definition: "the command putting up the app a page describes",
  code: "ts",
  test: "ts",
  partSlugs: ["module/deploy-kind-reading", "module/deploy-web-putting-up"],
  taking: [
    { said: "<slug>", takes: "the app to put up, named by the slug its page carries" },
    { said: "--dry-run", takes: "say what would be applied and change nothing" },
  ],
  helpNotes: [
    "one call names one app, and a second name is refused rather than chosen between.",
    "which kind of app a slug names is read from the pages carrying that slug, and a slug both a web app and an ios app carry is refused rather than chosen between.",
    "an ios app is refused here for now, since nothing here yet says how one is put in front of people.",
    "what the deploy is made of is not on the call: the page names a cluster service, that page names a workload, and the code beside it emits the manifests.",
    "the namespace stands first, then what is placed in it, then the workload that reads it.",
    "a manifest the cluster already stands as is applied again by nothing, so a second call does nothing.",
    "the build a pod serves is made here, inside that pod, from the commit HEAD stands at.",
    "a pod takes its source from origin, so a commit origin main does not carry refuses the call rather than being pushed onto main first.",
    "that commit is first proved to install from the manifests it tracks, since a workspace resolving on a workstation can be missing from git.",
    "a build already made from that commit is made again by nothing.",
    "what a build needs set is exported beside the manifest code, and a value it names that nothing holds refuses the call.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A deploy names one app.",
    },
    {
      invariantKind: "departure",
      statement: "Which kind of app a slug names settles how that app is put up.",
    },
    {
      invariantKind: "departure",
      statement:
        "A slug a web app page and an ios app page both carry is refused rather than chosen between.",
    },
    {
      invariantKind: "departure",
      statement: "A slug no app page of either kind carries is refused by naming both kinds.",
    },
    {
      invariantKind: "departure",
      statement: "What a deploy is made of is read from the page rather than said on the call.",
    },
    {
      invariantKind: "departure",
      statement: "A dry run reports the same plan the run would carry out.",
    },
    {
      invariantKind: "gap",
      statement: "An ios app is put in front of people by this command.",
    },
  ],
} as const satisfies Command
