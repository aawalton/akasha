import type { Command } from "akasha/commands/command.page-type.types.ts"

export const deploy = {
  id: "01a05af7-5996-7002-bc83-446645b7de16",
  pageTypeSlug: "command",
  type: "command",
  slug: "deploy",
  definition: "the command putting up what a page describes",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  changeKind: "change-none",
  timeout: 300,
  parts: [
    "module/deploy-commit-naming",
    "module/deploy-ios-shipping",
    "module/deploy-kind-reading",
    "module/deploy-web-putting-up",
    "module/deploy-image-pushing",
    "module/deploy-simulator-installing",
    "module/deploy-device-installing",
    "module/deploy-inference-installing",
    "module/deploy-addon-installing",
    "module/deploy-bundle-publishing",
  ],
  taking: [
    {
      said: "<slug>",
      takes: "the app or service to put up, named by the slug its page carries",
    },
    { said: "--dry-run", takes: "say what would have been applied and change nothing" },
    { said: "--no-upload", takes: "build and validate an ios app without uploading it" },
    { said: "--ref <rev>", takes: "the commit an ios app is built at" },
    {
      said: "--measured",
      takes: "run the whole deploy under no ceiling, so what it cost is recorded",
    },
    {
      said: "--simulator",
      takes: "install an ios app on a simulator rather than hand it to Apple",
    },
    {
      said: "--device",
      takes: "install an ios app on the phone its page names rather than hand it to Apple",
    },
  ],
  helpNotes: [
    "one call names one thing, and a second name is refused rather than chosen between.",
    "which kind of thing a slug names is read from the pages carrying that slug, and a slug both a web app and an ios app carry is refused rather than chosen between.",
    "a slug a web app and a cluster service both carry names the web app, because putting up that web app puts up the cluster service it names.",
    "a cluster service no web app names is put up here too, its manifests applied and its image built where the registry does not hold it.",
    "an image is tagged with the hash of what it was built from, so a checkout that changed nothing names the image already there and builds nothing.",
    "a workstation service is put up here as its systemd units, written where akasha owns them and linked where systemd reads them.",
    "one call reaches one workstation service's own units, and the units of a service the pages no longer account for are swept by `akasha infrastructure service sweep`.",
    "an ios app is named by the `app-slug` its page states, which is its short name rather than the page's own slug.",
    "an ios app is built on the MacBook at Release at the commit `--ref` names, and the build takes its own number.",
    "`--ref` takes whatever git resolves — a branch, a tag or a sha — and a call naming none builds the commit HEAD is at.",
    "a call naming no `--ref` is refused where a tracked file differs from HEAD, because the build would leave that change out of the app without saying so.",
    "a `--ref` named is built however the worktree differs from it, since the commit was told rather than worked out.",
    "a commit no origin ref reaches is pushed there before the build begins, because the MacBook builds by fetching origin into its own clone.",
    "the report names the commit asked for before the build begins and the commit each half was pinned to once it has.",
    "nothing is said until an ios build has finished, because a command prints nothing itself, and what the build said is the report.",
    "an upload reaches every internal tester, since each app's one group holds all builds and each build notifies, so `--no-upload` is what holds a build back from a phone.",
    "`--dry-run` belongs to a web app and to a cluster service, `--no-upload` and `--ref` to an ios app, and one named on another kind is refused rather than ignored.",
    "`--measured` lifts the ceiling the call runs under, so a deploy longer than that ceiling finishes rather than being stopped part way.",
    "`--measured` belongs to a deploy of either kind, since either kind can run past the ceiling.",
    "an ios deploy that archived, exported and uploaded measured 228 seconds on 2026-09-09, which is what the seconds this page states leave room over.",
    "what the deploy is made of is not on the call: the page names a cluster service, that page names a workload, and the code beside it emits the manifests.",
    "the namespace comes first, then what is placed in it, then the workload that reads it.",
    "a manifest the cluster already holds is applied again by nothing, so a second call does nothing.",
    "the build a pod serves is made here, inside that pod, from the commit HEAD is at.",
    "a pod takes its source from origin, so a commit origin main does not carry is pushed there before the build begins.",
    "that commit is first proved to install from the manifests it tracks, since a workspace resolving on a workstation can be missing from git.",
    "a build already made from that commit is made again by nothing.",
    "what a build needs set is exported beside the manifest code, and a value it names that nothing holds refuses the call.",
    "a container recipe naming a repository is built and pushed here, which is how an image no cluster service names reaches the registry.",
    "`--simulator` builds an ios app on the mac from this checkout's tree and installs it on a simulator there, and the site the app serves is staged first.",
    "`--simulator` belongs to an ios app, and a call naming it on another kind is refused rather than ignored.",
    "`--device` builds an ios app on the mac from `origin/main` and installs it to the phone the app's page names, and an app naming no phone is refused rather than guessed at.",
    "`--device` is the path onto the phone plugged into the mac, and TestFlight is the path onto every other phone.",
    "an inference service is put up here as a conda environment and a launchd agent on the machine its page names, reached over ssh.",
    "the folder the host is handed is the folder the provision script that service names sits in, so no page spells a path.",
    "a host already holding that service at the hash of that folder and what it runs is applied to by nothing, so a second call does nothing.",
    "the pool file the traffic cop reads is written from every inference service before the one named is applied.",
    "an inference service whose page says it is not to be running is torn off the host rather than left there.",
    "`--dry-run` belongs to an inference service too, and it reaches the host to read the host and changes nothing.",
    "an ESO addon is transpiled to Lua here and its folder in the game replaced with what that build left.",
    "the folder an addon is built from is the folder its page sits in, and the name the game reads it by comes from the manifest there.",
    "each sibling folder the addon's manifest declares is replaced beside it, and every file written is verified against its source by sha256.",
    "a folder in the game carrying no build stamp was installed by something else, and it is left alone or refused rather than deleted.",
    "`--dry-run` belongs to an ESO addon too, and it says where the addon is built from and what it is placed as, touching neither.",
    "a web app whose page states an addon bundle image has every addon compiled, packed and pushed to the registry before the app is put up.",
    "the bundle image is named by the hash of the archive inside, so a commit changing no addon publishes no new image.",
    "the tag naming that image lands as its own commit once the push is done, and the app is then built from the commit that tag is in.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A deploy names one thing.",
    },
    {
      invariantKind: "departure",
      statement: "Every kind a deploy puts up is a service.",
    },
    {
      invariantKind: "departure",
      statement: "Which kind of thing a slug names settles how that thing is put up.",
    },
    {
      invariantKind: "departure",
      statement:
        "A slug a web app page and an ios app page both carry is refused rather than chosen between.",
    },
    {
      invariantKind: "departure",
      statement: "A slug no kind this puts up carries is refused by naming every kind.",
    },
    {
      invariantKind: "departure",
      statement: "A workstation service is put up with nothing built.",
    },
    {
      invariantKind: "departure",
      statement: "A deploy reaches the units of the one workstation service it names.",
    },
    {
      invariantKind: "departure",
      statement:
        "The parts a deploy is made of are read from the page rather than said on the call.",
    },
    {
      invariantKind: "departure",
      statement: "A commit named on the call settles the commit an ios app is built at.",
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
    {
      invariantKind: "departure",
      statement: "A deploy runs under the ceiling its page states unless the call says otherwise.",
    },
    {
      invariantKind: "departure",
      statement: "A deploy told to be measured runs under no ceiling.",
    },
    {
      invariantKind: "departure",
      statement:
        "A cluster service is put up with the image it runs built where the registry lacks it.",
    },
    {
      invariantKind: "departure",
      statement: "A container recipe is put up as its image in the registry and nothing else.",
    },
    {
      invariantKind: "departure",
      statement:
        "An ios app told to go on a simulator is installed there rather than handed to Apple.",
    },
    {
      invariantKind: "departure",
      statement: "An ios app told to go on a phone is installed there rather than handed to Apple.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming both places to install to is refused rather than chosen between.",
    },
    {
      invariantKind: "departure",
      statement:
        "An inference service is put up as an environment and an agent on the machine its page names.",
    },
    {
      invariantKind: "departure",
      statement: "A host already holding an inference service unchanged is applied to by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "An inference service its page says is not to be running is torn off its host.",
    },
    {
      invariantKind: "departure",
      statement: "An ESO addon is compiled to Lua and put where the game reads it by this command.",
    },
    {
      invariantKind: "departure",
      statement: "An addon that will not compile leaves the game's folder as it was.",
    },
    {
      invariantKind: "departure",
      statement: "A folder in the game nothing here wrote is never deleted on missing evidence.",
    },
    {
      invariantKind: "departure",
      statement: "A web app whose page states an addon bundle image publishes that bundle first.",
    },
    {
      invariantKind: "departure",
      statement: "The bundle is published before the web app serving it is put up.",
    },
  ],
} as const satisfies Command
