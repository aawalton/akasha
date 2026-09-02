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
      statement: "Nothing reads a readout through the markdown engine.",
      workingMemory:
        "The bar is already off markdown: `group-stoplights.ts` reaches `stoplightsInGroup`, which asks the pages service and gets akasha's own 16 readouts, one a slug markdown never held. `readoutCatalog()` still opens 15 `*.readout.md`, feeding the iOS widgets and surplus-fall. What blocks the rest is modelling, not wiring: akasha holds no `claude-usage` group nor its 4 readouts, no query properties against markdown's 104, and no `sequence-slugs`. `9687ce6f2e` refuses where the two engines differ.",
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
      statement: "The interior of Alan's site stands in akasha.",
      workingMemory:
        "The interior is everything under `app/` but `routes/` and `hooks/`: 128 files, every one outside akasha. `akasha/alan/web` holds 4, and taking the basename of each `app/` file and looking for it under akasha matches none. The old note conflated mentions with imports: `@shared/pages-ui` is 22 occurrences on 18 lines, but only 4 real import statements repo-wide and 1 in Alan's site, at `app/components/app-shell.tsx:10`. `@shared/utils-test` is a second outward reach, in two component tests.",
    },
    {
      statement:
        "The packages under Alan's site that name no package of their own stand in akasha.",
      workingMemory:
        "The stated blocker is gone and so is half the work: `app/questions` was deleted rather than migrated, at `4b763e9df4`. So this is 2 files, not 6, both in `app/hooks`, and neither reaches `@shared/pages-ui` at all. `use-mark-notification-read.ts` imports `@akasha/pages-ui` since `080d49481e` and escapes nowhere, so it could land today. `use-mark-read-on-end.ts` has 3 `~/lib/*` reaches into the interior. `alanwalton/web/dist/` is stale from 08-31 and re-derives the old counts.",
    },
    {
      statement: "The routes of Alan's site stand in akasha.",
      workingMemory:
        'Last of the three, because `app/routes` is the only part of this move with modelling nobody has done. Nothing waits on it; it waits on the interior. Re-counted parsing import and export statements rather than every `from`, which over-counts on Supabase `.from("table")`: 65 files carry 277 specifiers, of which 7 stay inside, 42 are `./+types/*` codegen, 156 name packages, and 72 escape. 71 of those are `~/` over seven directories; none reach `awen`, which went at `e284363224`.',
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
