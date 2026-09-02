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
      statement: "The code editor's four panels each show what akasha holds.",
      workingMemory:
        "All four panels and the bar draw, measured at `7a6d788132`: activation 278ms against the 4506ms recorded here, page-tree 64ms against 4357ms. Pages draws 2376 rows over 997 akasha files and none from anywhere else, where before it drew 3180 from `pages/` and none from akasha. Domains 7313 rows on 16 roots, Work 13, Agents 93. Two gaps: 258 Pages rows open no document, since no domain page is named for a property kind, and Agents reads transcripts rather than pages.",
    },
    {
      statement: "Nothing reads a readout through the markdown engine.",
      workingMemory:
        "Measured under `strace` at 13:19: `readoutCatalog()` opens 15 `*.readout.md` and no `*.readout.ts`, and `resolveReadoutGroup` answers upkeep 6, inboxes 3, values 6, surplus 1, safety 1, every one out of markdown. The reach is `readout-catalog.ts:4-6`, which value-imports three `page/` modules, and `readout.page-type.md:6` declaring `files: akasha:**/*.readout.md`, so the table points at markdown by construction. Two callers sit outside: `ios-widget-swift.ts:93` and `surplus-fall/tick.ts:95`.",
    },
    {
      statement: "The code editor's extension sits in akasha.",
      workingMemory:
        "Re-derived at 13:22 with `ts.preProcessFile`, three runs identical and no specifier unresolved: the extension program holds 306 files outside its folder, not 197. tools/ 66, akasha/ 194, page/ 35, repo/ 7, agent/ 2, refusal/ 1, patches/ 1. The old five buckets summed to 195 and were read off a build from 10:56. Direction is right: akasha 35 to 194 while tools 116 to 66. The folder has not moved, though: 76 files under `src`, a workspace member, and `code-editor/extensions/ops` symlinks to it.",
    },
    {
      statement: "Nothing reaches pages through the old query engine.",
      workingMemory:
        "The note censused which store answers a read; the statement asks which engine is in the path, and both halves fail. The write half runs now: `page-query-landing.ts:14` routes to `page-write.ts` over checkout markdown, and `observation-writer-main.ts` was live, with 86 `pages/**.uncommitted.yaml` touched in an hour. The read half was severed rather than migrated at `fbf73c4710`; two entry modules were put back at `f9307ff1dc`, so importers resolve again. `askHere` is gone for good.",
    },
    {
      statement: "`pages-ui` stands in akasha.",
      workingMemory:
        "`src` holds one file: `use-app-nav-items.tsx`. `media-server.ts` went at `7b84767250` with no importer, the registrar at `b67a9fd3c7`, and `serve-media.ts` at `4775d51c6b` — that one was never dead, so its four media routes were rewired to the akasha module first. `identifier-matches-its-place` blocks the last file: it reads a component off JSX nested inside `toNavItem` and a `useMemo`, so it asks for a component name where the hook rule asks for `use`. Four apps import it.",
    },
    {
      statement: "The interior of Alan's site stands in akasha.",
      workingMemory:
        "`@shared/pages-ui` is down to 15 statements in 13 files, and 7 of those are akasha prose. The code is 4 `app-shell.tsx` and 2 under `infra/cluster-checks`, every one reaching the single file left in `src`: `use-app-nav-items.tsx`. So one naming conflict gates this intent as well as pages-ui, where `identifier-matches-its-place` reads a component off JSX nested in a callback. The `awen` folder went at `e284363224`, so the 179-file census wants retaking before this lands.",
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
