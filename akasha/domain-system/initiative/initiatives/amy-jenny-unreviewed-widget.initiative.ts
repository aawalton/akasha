import type { Initiative } from "../initiative.page-type.ts"

export const amyJennyUnreviewedWidget = {
  id: "01a05431-37d9-7a21-ad2f-423df6ef1ac1",
  pageTypeSlug: "initiative",
  slug: "amy-jenny-unreviewed-widget",
  domainSlug: "domain/alan-harness",
  personaSlug: "amy",
  parentSlug: "akasha-migration",
  intents: [
    {
      statement: "The packages reading and writing pages stand in akasha.",
      workingMemory:
        "`shared/pages-query` is 8 files and no small move: its sources close over 214 under `tools/`, `page/`, `repo/`, `readouts/`, and `imports-inside` refuses every relative escape from `akasha/`. It waits on the root page engine landing beneath it, not on `roots.ts`, whose depth arithmetic went at `099d098c77`. Five increments, filed at `the-root-page-engine-lands-as-five-packages-in-this-order`; none of P0's 7 leaf folders stands in akasha. Inbound: 120 statements in 86 files, 113 name the router.",
    },
    {
      statement: "The packages Alan's own work rests on stand in akasha.",
      workingMemory:
        "Six folders under `alanwalton/`, two build scratch; `calendar-sync` there is 3 files of deploy machinery over `@akasha/calendar-sync`; that, `@akasha/health-samples-import` and `@akasha/ssh-access` landed. Audit: 40 checks, 5497 files, 16 refusals — 11 `manifest-names-what-is-reached`, all `@capacitor` and not moving; 4 `no-rule-in-two-files`, down from 15 in an hour; 1 lower-camel. mobile-cli's 4 `ios-program` reaches resolve; 6 escapes in 3 files onto `tools/lib`/`repo/roots` block it.",
    },
    {
      statement: "The design packages stand in akasha.",
      workingMemory:
        "design-system stands at `644bb74cec` and `583bc845f5`: 5 stylesheets, 36 gallery modules, `shared/design-system` gone. The blocker was already gone: its 13 TS2322 errors typecheck clean and no `void` was rewritten. Inbound resolved to 8 edges, 7 products reaching the `.css` and one route the gallery; 10 tsconfigs dropped a reference rather than repoint. Every globals.css scanned only `shared/design-patterns`, so its 37 moved modules went unscanned by Tailwind; each names both now.",
    },
    {
      statement: "`pages-ui` stands in akasha.",
      workingMemory:
        "`@akasha/pages-ui` stands with four modules and the old folder is down from 296 files to 291. It is one package rather than several: components and supabase are mutually dependent, and the 58 subpaths consumers reach cut across one core. The cost is not the module pages but what a file is rewritten to satisfy: 116 of 286 carry a `void` return, 360 in all, and every `.tsx` rendering a component by name meets the lower-camel rule. 98 files import nothing else inside it and go first.",
    },
    {
      statement: "The interior of Alan's site stands in akasha.",
      workingMemory:
        "`lib` 51, `idle` 50, `awen` 51, `components` 18, `hooks` 2, `questions` 7 under `alanwalton/web/app/`: 179 files as one landing, none moved. Only pages-ui gates it now — design-primitives landed, and these folders already reach `@akasha/design-primitives` in 23 files over 49 statements. What waits is 42 `@shared/pages-ui` statements in 22 files, rewritten twice if this went first. `.json` and `.css` are no crux: `file-has-its-page` holds no extension list and they land as file properties.",
    },
    {
      statement:
        "The packages under Alan's site that name no package of their own stand in akasha.",
      workingMemory:
        "Two of the four are gone: `chess` and `action-verbs` landed into `@akasha/alanwalton-web` at 6edf596cb8. `hooks` and `questions` are what is left, and they never waited on that package: every file of theirs still in place reaches `~/lib/*` or `~/components/*`, which nothing inside akasha resolves. Four of their nine files are `~/`-free and could stand alone; the other five rest on an 11-file closure under `app/lib` that the next intent owns and that already names both folders.",
    },
    {
      statement: "The routes of Alan's site stand in akasha.",
      workingMemory:
        "Last of the three, because `app/routes` is the only part of this move with modelling nobody has done. Nothing waits on it: the site is a leaf with no inbound importers. The shape is settled: a lane built the site through a symlinked package root and got exit 0 with asset hashes identical to the control, tailwind emitting 114,234 bytes. What breaks a move is depth rather than the symlink, and 3 of 15 escaping imports reach siblings.",
    },
    {
      statement: "Alan's unreviewed transaction iOS widget works.",
      workingMemory:
        "His widget compiles. With `www` staged, `ios-app build alanwalton --www <dir>` exits 0 with BUILD_SIM_OK: BUILD SUCCEEDED, no error, all 21 components into ValuesWidgetExtension, `alanwalton-widget-feed` among them, so its `HELD_FOR` and `takenAt` are proven; the two warnings are old AppDelegate captures. Staging is still by hand and that is filed. Nothing but the reading is left: `MONARCH_COOKIE` is dead and only Alan can mint another.",
    },
    {
      statement: "Jenny's site deploys from akasha.",
      workingMemory:
        "Deployed and proved live. READING_RELAY_SECRET stands in her sops at the workstation's value, moved by `sops edit` and checked by digest, never printed. Her pod runs b4289a8e7a: the relay route 401s without the secret and 400s with it on a body that is no reading, and her tile route answers 503 No reading in 0.23s, its build naming neither alanwalton.com nor SMILINGJENNY_RELAY_SECRET. The bypass arm is gone and Alan runs f25c8ffc, where that secret answers 401 rather than 503.",
    },
    {
      statement: "Jenny's unreviewed transaction iOS widget works.",
      workingMemory:
        "Her Swift compiles: `akasha ios-app build smilingjenny` exits 0 with BUILD_SIM_OK — BUILD SUCCEEDED, no errors, no warnings, 12 files into SmilingJennyWidgetExtension, installed to a simulator. `ring` and `categorize-ring` are among them, so the one ring both tiles name is proven. This box has no swiftc but the command hands the build to `macbook`. Nothing but the reading is left. Her route is 7 lines over `module/readout-categorization` and Alan's is still a 44-line copy, filed.",
    },
  ],
  constraints: [
    "Every intent on Alan's side comes before Jenny's even though the end of the work is hers.",
    "The ring is drawn by one file both tiles share, so it moves once and serves both.",
    "The reading is taken on a workstation because a reading is never committed, and the store writes only what it commits.",
    "A package under akasha may depend on one standing outside it, and several already do, so an outside dependency is no reason to hold a move back.",
    "An akasha deploy names one thing, reads what it is made of from its page, refuses what is ambiguous, and does nothing already done.",
    "A deploy is gated on the tracked tree installing rather than the worktree, since a manifest stands on disk and not in git and passes every check run here.",
    "Nothing waits on Alan: a question for him becomes a finding with the call taken in his absence, and the work carries on.",
    "No act on this initiative is out of reach, deploys to the cluster included; only permanently deleting the repository is refused.",
    "Work runs in parallel through subagents wherever it can, twenty at once at the most.",
    "A package moving into akasha is written in afresh, since no command carries a file in. It is renamed to empty the old folder rather than because its old name would stop resolving.",
  ],
} as const satisfies Initiative
