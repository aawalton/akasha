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
      statement: "Alan's inboxes stoplights and widget work.",
      workingMemory:
        "Three answer: email, tasks, temper-tasks. Measured through `answerStoplightsAdmittedBy` against the live store on 8787: `in group 3 | readings held 3 | STOPLIGHTS 3`, against 5 before. Questions and texts went at `fdee638096` with every reference, and `live-count` with them as the one readout it served. The reading script and route test went first at `e0015925ad`, since `akasha write` refuses a path outside `akasha/`. The relay unit is reinstalled at three runs. Owed is a widget build.",
    },
    {
      statement: "Nothing reaches pages through the old query engine.",
      workingMemory:
        "Alan has ruled this the priority: the pod cannot answer page queries from its own checkout and must reach the pages-system-service. That checkout resets to origin at pod start and was 262 commits stale, hiding four landed readouts from his widget while they were right here. The service answers for akasha pages alone and refuses the rest by name, so a census of what the pod asks for is owed before any switch. No fallback to the checkout: that is the same defect wearing resilience.",
    },
    {
      statement: "`pages-ui` stands in akasha.",
      workingMemory:
        "24 of 24 landed in four commits closing at `71605357c2`; `shared/pages-ui/src` holds only the 4 that cannot move. Subpath patterns are refused by `manifest-lands-on-a-file`, so the manifest was emptied of the 127 ways in nothing outside took — 11,940 bytes with 3,060 spare. What is left is `nav-command-bindings-registrar.tsx`, `use-app-nav-items.tsx` (filed at `0aebaaa341`), and the dead `serve-media.ts` with `media-server.ts` behind it.",
    },
    {
      statement: "The interior of Alan's site stands in akasha.",
      workingMemory:
        "`lib` 53, `idle` 50, `awen` 51, `components` 19, `hooks` 2, `questions` 4 under `alanwalton/web/app/`: 179 files as one landing, none moved. `app/` holds 257, so 78 files sit outside that census. Only pages-ui gates it now; design-primitives landed, reached in 23 files over 49 statements. What waits is 31 `@shared/pages-ui` statements in 22 files, rewritten twice if this went first. `.json` and `.css` are no crux: `file-has-its-page` holds no extension list and they land as file properties.",
    },
    {
      statement:
        "The packages under Alan's site that name no package of their own stand in akasha.",
      workingMemory:
        "`link-target` landed at `996a2d5362` and `a6c30a4eff`, so `questions` holds 4 files and `hooks` 2. The old census was stale: 7 files, not 9, and 1 was `~/`-free, not 5. `imports-inside` settles the rest — it ignores npm but refuses a workspace outside akasha — so 2 of the 6 wait on `@shared/pages-ui`, and the other 4 on 9 files under `app/lib` plus `components/signed-out-notice`. Every one of the 6 waits on the interior intent.",
    },
    {
      statement: "The routes of Alan's site stand in akasha.",
      workingMemory:
        "Last of the three, because `app/routes` is the only part of this move with modelling nobody has done. Nothing waits on it: the site is a leaf. The shape is settled: a lane built the site through a symlinked package root, exit 0, asset hashes identical to the control, tailwind emitting 114,234 bytes. Its 67 files carry 299 imports: 6 stay inside, 49 are `./+types/*` codegen resolving outward, 158 name packages, 86 escape — 76 by `~/` over nine directories and 10 by `../` into `awen`.",
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
    "An iOS app or widget that changes is uploaded to TestFlight. `--no-upload` was no bound of Alan's; it was inherited and held three apps back. Apple's own distribution switches stay untouched.",
  ],
} as const satisfies Initiative
