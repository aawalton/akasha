import type { Initiative } from "../initiative.page-type.ts"

export const migrateAlanAndJennyToAkasha = {
  id: "01a05431-37d9-7a21-ad2f-423df6ef1ac1",
  pageTypeSlug: "initiative",
  slug: "migrate-alan-and-jenny-to-akasha",
  domainSlug: "domain/alan-harness",
  personaSlug: "amy",
  parentSlug: "akasha-migration",
  intents: [
    {
      statement: "All three iOS apps ship to TestFlight from an akasha command.",
      workingMemory:
        "An upload IS a delivery: each app has one internal group holding every build, and every build carries `autoNotifyEnabled`, so the command cannot decline to notify and its only lever is `--no-upload`. Read off the live API without uploading, filed at `8f90294f14`. Jenny's 22 and Atlas 2 are signed, stamped, Apple-validated, waiting on a person. Left to build is the command: `akasha deploy` says an iOS app is not put up by it yet, and Atlas has no page, so it is not even found.",
    },
    {
      statement: "Alan's health samples are read from akasha rather than from the old markdown.",
      workingMemory:
        "Rows die because the pod writes its own checkout and nothing commits. Durability is the service road; `akasha/` is only the toll gate, since `/write` refuses every path outside it. This is a page-type migration on the daily-tracking recipe: mint the akasha type and entry property, move 234 days to `.ts` with 233 `.jsonl` beside them. Whole-file put with a `read` precondition and bounded retry; append is barred because the writer upserts. `sampleRowsAt` restates the rule and refuses at `.part2`.",
    },
    {
      statement: "Alan's and Jenny's safety iOS widgets work.",
      workingMemory:
        "Both halves are proven as far as the pod; the phones are unseen. Alan's deployed at `d0f4d24621`. Jenny's landed at `aceffc1382`, a second `runs` line on his relay, and `172cd167b9`, her route on the same `safety` group. Her site now serves `49134b9632`, where `/api/errors` answers 405 rather than 404. Proven against the real store and the real held reading: 401 bare, 503 with nothing carried in, 200 and a whole stoplight otherwise, plus 16 tests. Her tile shows Alan's level, by design.",
    },
    {
      statement: "Alan's and Jenny's surplus iOS widgets work.",
      workingMemory:
        "Both tiles draw a reading and Alan reports the figure wrong. The number is right: `surplus-hours` is derived on the day as sleep less spend, and recomputing from the day's stretches matches it exactly. Wrong was that a readout said nothing about how wide its figure is written, so the tile got 21 characters of float tail and broke them off mid-number. `ad85a10ab5` gives a readout a figure-format and refuses a day holding neither half; site tests `7b978fb3e6`; deployed `776bd64872`. Phones unseen.",
    },
    {
      statement: "Jenny's site deploys from akasha.",
      workingMemory:
        "Deployed and proved live. READING_RELAY_SECRET stands in her sops at the workstation's value, moved by `sops edit`, digest-checked, never printed. Pod b4289a8e7a: her relay 401s bare and 400s with the secret on a body that is no reading; her tile route answers 503 No reading on the ring credential. A relay secret 401s at her tile route as at Alan's, a category error and not a stale build, filed at alans-tile-route-refuses-jennys-credential-by-design-rather-than-by-age. He now runs 0c6fb83a1f.",
    },
    {
      statement: "Nothing reaches pages through the old query engine.",
      workingMemory:
        "All five lanes landed; reaches fell from 105 files to 49, mostly stubs that say so out loud. Correction worth keeping: only KEYED writes refuse for good. The file verbs work, and the new service's `/write` takes puts under `akasha/`, which is what the device-secret writes moved onto. `sms-discard` shouts before answering now. `capture-error` no longer regresses: the `error` page type landed at `2e37f1ecc7`; a report through the real route answered 204 and filed a page.",
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
        "94 modules stand; `shared/pages-ui` is 197 files, down from 242 in three waves, each akasha side then shared: `e6bc83de08`/`3d7dbbb9a4`, `5e6066a97e`/`4ec864267d`, `8c976b924d`/`e6fb3628c6`. Land akasha first so HEAD never goes red. Slugs renamed here: `types`->`page-with-properties`, `page-row`->`view-row`, `views`->`view-callbacks`; two pass-throughs died rather than moved. 51 leaves left. Arriving private casts took `no-rule-in-two-files` 4 to 7, filed. 10 tsconfigs name the old path.",
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
        "Two of the four are gone: `chess` and `action-verbs` landed into `@akasha/alanwalton-web` at `6edf596cb8`, 16 files in 7 modules, reached by name at 3 call sites. `hooks` (2 files) and `questions` (7) are left, and they never waited on that package. 5 of the 9 are `~/`-free and could stand alone; the other 4 rest on 8 files under `app/lib` — api-fetch, api-origin, auth-error, capacitor-bridge, offline-text, open-questions-resync, read-completion, sender-surface — which the interior intent owns.",
    },
    {
      statement: "The routes of Alan's site stand in akasha.",
      workingMemory:
        "Last of the three, because `app/routes` is the only part of this move with modelling nobody has done. Nothing waits on it: the site is a leaf with no inbound importers. The shape is settled: a lane built the site through a symlinked package root and got exit 0 with asset hashes identical to the control, tailwind emitting 114,234 bytes. Its 62 files carry 307 imports: 47 stay inside, 164 name packages, 20 npm, 76 escape to app siblings — 66 by `~/` and 10 by `../`, all into `awen`.",
    },
  ],
  constraints: [
    "The ring is drawn by one file both tiles share, so it moves once and serves both.",
    "The reading is taken on a workstation because a reading is never committed, and the store writes only what it commits.",
    "A package under akasha may depend on one standing outside it, and several already do, so an outside dependency is no reason to hold a move back.",
    "An akasha deploy names one thing, reads what it is made of from its page, refuses what is ambiguous, and does nothing already done.",
    "A deploy is gated on the tracked tree installing rather than the worktree, since a manifest stands on disk and not in git and passes every check run here.",
    "Nothing waits on Alan: a question for him becomes a finding with the call taken in his absence, and the work carries on.",
    "No act on this initiative is out of reach, deploys to the cluster included; only permanently deleting the repository is refused.",
    "Work runs in parallel through subagents wherever it can, twenty at once at the most.",
    "A package moving into akasha is written in afresh, since no command carries a file in. It is renamed to empty the old folder rather than because its old name would stop resolving.",
    "The command putting an app in front of people is `akasha deploy` naming that app's slug, whichever kind of app its page turns out to be.",
  ],
} as const satisfies Initiative
