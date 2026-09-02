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
        "`akasha deploy <slug>` reaches all three now, dispatched through the markdown `ios-app` registry rather than the `.ts` pages, which mark which sources have migrated and are no record of what exists. Proven four times with `--no-upload`: builds 2, 22 and 200 stamped `b0587b0306`, Apple-validated, 0 uploads and 0 build numbers spent. What is left is the upload, which delivers to a phone and waits on Alan; the call not to move Apple's switches is filed at `797a2ef58f`.",
    },
    {
      statement: "Alan's health samples are read from akasha rather than from the old markdown.",
      workingMemory:
        "Whole-file put with a `read` precondition is proven: 16/16 on a private root naming no remote — `.jsonl` byte-identical over four landings, CAS refuses a stale put without corrupting, lands where no file is, and is per-path, so two days never contend. The move has not begun: 234 pages and 233 rows files are still in `pages/eso-daily-tracking/`. Each is re-slugged, since `2026-01-01` is no export name. Go through `akasha` commands; a hook reverts akasha writes made outside the gate.",
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
        "The stoplights answer: 41 personas, 6 values, in declared order. What blocked them was `readouts/ask-here.ts` throwing for every slug — severed with the HTTP client, it took the checkout engine down with it. It routes now, asking the checkout first and carrying only a 503 UNREACHED on to the service. That is a bridge, not the destination: it adds a reach. Alan's keep arm forbids moving `value` and `persona-day`, so closing this needs the service to serve markdown-backed types.",
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
        "126 modules are in now; `shared/pages-ui` is 158 files, down from 242 over five waves, akasha side then shared. The fifth is `30e3c26a01`, its shared half swept into `8578005043`. Land akasha first so HEAD never goes red. The manifest blocks the rest, not the leaves: 14,662 bytes against a 15,000 ceiling, 108 a way in, room for three. Filed as `the-pages-ui-manifest-fills-before-the-package-does`; subpath patterns proven, array targets disproven. 56 leaves left, ten landing exposed ten.",
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
