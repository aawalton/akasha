import type { Command } from "akasha/commands/command.page-type.types.ts"

export const deploy = {
  id: "01a05af7-5996-7002-bc83-446645b7de16",
  type: "command",
  slug: "deploy",
  definition: "the command putting up what a page describes",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  timeout: 300,
  parts: [
    "module/deploy-check-judging",
    "module/deploy-commit-naming",
    "module/deploy-commit-recording",
    "module/deploy-file-closure",
    "module/deploy-ios-shipping",
    "module/deploy-kind-reading",
    "module/deploy-web-putting-up",
    "module/deploy-image-pushing",
    "module/deploy-simulator-installing",
    "module/deploy-device-installing",
    "module/deploy-inference-installing",
    "module/deploy-addon-installing",
    "module/deploy-bundle-publishing",
    "module/deploy-tree-pinning",
  ],
  taking: [
    {
      said: "<slug>",
      takes: "the app or service to put up, named by the slug its page carries",
    },
    { said: "--no-upload", takes: "build and validate an ios app without uploading it" },
    { said: "--ref <rev>", takes: "the commit to put up" },
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
      statement:
        "A deploy reaches every workstation service's units at once rather than one service's.",
    },
    {
      invariantKind: "departure",
      statement:
        "The parts a deploy is made of are read from the page rather than said on the call.",
    },
    {
      invariantKind: "departure",
      statement: "A deploy is made at one commit rather than at whatever HEAD is at the time.",
    },
    {
      invariantKind: "departure",
      statement: "A commit named on the call settles the commit a deploy is made at.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming none is made at the commit HEAD is at, resolved to its hash.",
    },
    {
      invariantKind: "departure",
      statement: "The report names that hash before anything the kind itself says.",
    },
    {
      invariantKind: "departure",
      statement: "A deploy that finished keeps the commit beside the page it was read from.",
    },
    {
      invariantKind: "departure",
      statement: "A deploy that refused keeps the commit it refused at under its own key.",
    },
    {
      invariantKind: "departure",
      statement: "A dry run keeps no commit beside any page.",
    },
    {
      invariantKind: "departure",
      statement: "What putting a thing up cost is kept beside the page that thing was read from.",
    },
    {
      invariantKind: "departure",
      statement: "What is counted is the putting up rather than the reading and judging before it.",
    },
    {
      invariantKind: "departure",
      statement: "A dry run keeps no cost, since a dry run puts nothing up.",
    },
    {
      invariantKind: "departure",
      statement: "A commit kept here is uncommitted, so no deploy lands a commit of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A file another deploy is built from and this one is not leaves this one alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "The checks stating they run on a deploy judge a deploy before anything is put up.",
    },
    {
      invariantKind: "departure",
      statement:
        "Those checks are run over what changed from the last deploy's commit to this one.",
    },
    {
      invariantKind: "departure",
      statement: "A check refusing a file a deploy is built from refuses that deploy.",
    },
    {
      invariantKind: "departure",
      statement: "A dry run is judged by those checks as a run that puts up is.",
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
      statement: "`--dry-run` belongs to every kind but the ios app.",
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
    {
      invariantKind: "departure",
      statement:
        "A deploy is built from a tree pinned at the commit rather than from the checkout.",
    },
    {
      invariantKind: "departure",
      statement: "Each thing a deploy puts up is named as soon as that thing reaches a machine.",
    },
    {
      invariantKind: "departure",
      statement: "A deploy that threw part way names those things in its refusal.",
    },
    {
      invariantKind: "departure",
      statement:
        "A deploy that threw before any of them says so rather than saying it may be partial.",
    },
    {
      invariantKind: "departure",
      statement: "The putting up a deploy runs is handed in.",
    },
  ],
  name: "deploy",
  arguments: [{ argument: "argument/dry-run" }],
} as const satisfies Command
