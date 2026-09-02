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
      statement: "Alan's upkeep widget shows all six stoplights.",
      workingMemory:
        "The group page, the groupSlugs restore and the route line landed at 4d6e5504e2, 221c5cc7cd and d1ddb90e0c, so the seam returns 2 of 6. Four lanes now hold capacity, plants, activity and sleep, each owed a readout page, its code, its test, a scale page and the reading and relay services. All four scales exist in markdown alone. Order: safety, surplus, capacity, plants, activity, sleep. Count what returns, since a partial migration shows fewer rings rather than failing.",
    },
    {
      statement: "Alan's inboxes stoplights and widget work.",
      workingMemory:
        "Next after upkeep, at Alan's word, and it may need more pages migrated to support it. `api.inbox-stoplights.ts` is a 503 stub guarded like the others. `inboxes-temper-tasks.readout.ts` exists under temper; whether it belongs to this group is unsettled. The upkeep seam is the template at `4d6e5504e2`, `221c5cc7cd` and `d1ddb90e0c`: a group page, `groupSlugs` restored where the migration dropped them, one route line. Three of five draws three rings rather than failing, so count what returns.",
    },
    {
      statement: "`akasha import health` replaces the old health import command.",
      workingMemory:
        "Alan's direction: the import migrates, and a backfill runs through it once the phone-side automation works. `tools/commands/elaine/health-import.ts:154` calls `upsertHealthSamples` from the workstation over ssh, the one path landing samples without the web route. Readings stopped 2026-08-23; the phone posts only when an App Intent is invoked, and the deployed build throws on every sample, so ten days wait on both. `landDay` carries no test, which is how that throw shipped.",
    },
    {
      statement: "Nothing reaches pages through the old query engine.",
      workingMemory:
        "The bridge in `readouts/ask-here.ts` holds, by decision. No type is refused by name: the index covers `akasha/` alone and its loader requires TypeScript, so a markdown body throws and the page is dropped unnoted. A probe served `value` from markdown in 131 lines, six rows checked on disk. It buys little: the stoplights ask by saved query, so closing this needs seven page types, a frontmatter parser akasha declares it has none of, caching, and a kebab-camel ruling with live callers each side.",
    },
    {
      statement: "`pages-ui` stands in akasha.",
      workingMemory:
        "95 modules, down from 110 at `4fc83ea1fc`, reached by 52 statements in 40 files. Manifests are no longer the block; cycles are. 47 layer cleanly and 48 sit in one ring of 24 around `badge-registry.ts`, plus `block-row.tsx` against `use-textarea-input.ts`. Nothing bars a cycle among siblings inside one akasha package, so the ring lands whole rather than being broken first. `readRelationConfig` already exists at `view-tab-content-href`; import rather than carry.",
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
