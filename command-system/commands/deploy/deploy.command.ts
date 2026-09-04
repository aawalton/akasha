import type { Command } from "../command.page-type.ts"

export const deploy = {
  id: "01a05af7-5996-7002-bc83-446645b7de16",
  pageTypeSlug: "command",
  slug: "deploy",
  definition: "the command putting up the app a page describes",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  changeKindSlug: "change-none",
  partSlugs: [
    "module/deploy-ios-shipping",
    "module/deploy-kind-reading",
    "module/deploy-web-putting-up",
  ],
  taking: [
    { said: "<slug>", takes: "the app to put up, named by the slug its page carries" },
    { said: "--dry-run", takes: "say what a web app would have applied and change nothing" },
    { said: "--no-upload", takes: "build and validate an ios app without uploading it" },
    { said: "--ref <rev>", takes: "the commit an ios app is built at" },
  ],
  helpNotes: [
    "one call names one app, and a second name is refused rather than chosen between.",
    "which kind of app a slug names is read from the pages carrying that slug, and a slug both a web app and an ios app carry is refused rather than chosen between.",
    "an ios app is named by the `app-slug` its page states, which is its short name rather than the page's own slug.",
    "an ios app is built on the MacBook at Release at the commit `--ref` names, and the build takes its own number.",
    "`--ref` takes whatever git resolves — a branch, a tag or a sha — and a call naming none builds the commit HEAD is at.",
    "a call naming no `--ref` is refused where a tracked file differs from HEAD, because the build would leave that change out of the app without saying so.",
    "a `--ref` named is built however the worktree differs from it, since the commit was told rather than worked out.",
    "a commit no origin ref reaches is refused whatever names it, because the MacBook builds by fetching origin into its own clone.",
    "the report names the commit asked for before the build begins and the commit each half was pinned to once it has.",
    "nothing is said until an ios build has finished, because a command prints nothing itself, and what the build said is the report.",
    "an upload reaches every internal tester, since each app's one group holds all builds and each build notifies, so `--no-upload` is what holds a build back from a phone.",
    "`--dry-run` belongs to a web app, `--no-upload` and `--ref` to an ios app, and one named on the other kind is refused rather than ignored.",
    "what the deploy is made of is not on the call: the page names a cluster service, that page names a workload, and the code beside it emits the manifests.",
    "the namespace comes first, then what is placed in it, then the workload that reads it.",
    "a manifest the cluster already holds is applied again by nothing, so a second call does nothing.",
    "the build a pod serves is made here, inside that pod, from the commit HEAD is at.",
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
      statement: "A commit named on the call settles what an ios app is built at.",
    },
    {
      invariantKind: "departure",
      statement: "A commit named twice is refused rather than chosen between.",
    },
    {
      invariantKind: "departure",
      statement: "A dry run reports the same plan the run would carry out.",
    },
    {
      invariantKind: "departure",
      statement: "An ios app is put in front of people by this command.",
    },
    {
      invariantKind: "departure",
      statement: "A flag belonging to the other kind of app is refused rather than ignored.",
    },
  ],
} as const satisfies Command
