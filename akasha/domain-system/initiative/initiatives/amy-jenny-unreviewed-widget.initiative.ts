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
        "`@akasha/pages-access`, `pages-core`, `pages-url`, `pages-ui-store`, `pages-formula` and the store half of `pages-query` all stand, the first proven by 422 comparisons. Two remain. What held `shared/pages-query`, the local-first router above it, is smaller since `099d098c77`: `repo/roots` stopped counting its own depth and finds the checkout by its marker, so the 298-inbound file under it can move. `pages-system` split, 42 of 52 files reaching nothing. `pages-ui` is its own intent.",
    },
    {
      statement: "The packages Alan's own work rests on stand in akasha.",
      workingMemory:
        "Six folders left under `alanwalton/`, and `calendar-sync` is deploy machinery only now rather than a package. `@akasha/calendar-sync`, `@akasha/health-samples-import` (was `elaine-cli`, which states no `bin`) and `@akasha/ssh-access` landed; the last cleared the four `no-rule-in-two-files` refusals, so the audit stands at 11, all Capacitor. `mobile-cli`'s four `ios-program` reaches are named now; the rest wait on `pages/ios-app/` moving in: eight keys and one app akasha has not.",
    },
    {
      statement: "The design packages stand in akasha.",
      workingMemory:
        "The third half is closed at `96b233f937`: the check reads a `.css` now, the stylesheet scanned beside the code parsed, refusal set 11 before and 11 after. design-system still cannot land, 13 typecheck errors in 4 of its 36 `.tsx` waiting on the no-void-return narrowing. Its weight and its risk lie apart: 7 products reach only its 5 `.css` and one route reaches the 36-file gallery, so the stylesheets go first. design-patterns' barrel and the 36 `@shared/design-primitives` reaches stand.",
    },
    {
      statement: "`pages-ui` stands in akasha.",
      workingMemory:
        "`@akasha/pages-ui` stands with four modules and the old folder is down from 296 files to 291. It is one package rather than several: components and supabase are mutually dependent, and the 58 subpaths consumers reach cut across one core. The cost is not the module pages but what a file is rewritten to satisfy: 116 of 286 carry a `void` return, 360 in all, and every `.tsx` rendering a component by name meets the lower-camel rule. 98 files import nothing else inside it and go first.",
    },
    {
      statement: "The interior of Alan's site stands in akasha.",
      workingMemory:
        "`lib`, `idle`, `awen`, `components`, `hooks` and `questions`, some 170 files as one landing. It stands after `pages-ui` at 96 reaches and `design-primitives` at 65, because landing it first means rewriting 161 specifiers twice. `.json` and `.css` are not the crux: `file-has-its-page` holds no extension list and they land as file properties, with five precedents including css, svg and json. Only 8 files of the 286 are awkward.",
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
