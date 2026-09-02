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
        "Modelling landed at `7a08425a11`, `4514af0566` and `93f244918f`: a readout carries query, enabled, drawn-as and color fields, a group carries `sequence-slugs` and `sort-order`, and `claude-usage` with its 4 readouts is in akasha, taking group-divergence from 2 to 1. Three things block the reader moving: akasha has no `page-query` page type, so 104 queries have nowhere to go; `readout-group-serving` never reads `enabled`; and the inbox lights are dark, reading ⚫⚫⚫ against 🟢🔴🔴 earlier.",
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
        "124 files now, from 128. `capacitor-bridge`, `api-origin`, `api-fetch` and `capacitor-cors` are four modules under `akasha/alan/web` at `e11669e66a` and `dc0ebc8f50`, and 11 of routes' 71 escapes went with them. Ordering is the only bar left, since this initiative already rules an outside dependency none: 60 of the 128 imported no interior file at all. 15 files carry `.server`, a build-time guard akasha's naming cannot spell. A `declare global` and prose in code are both refused.",
    },
    {
      statement:
        "The packages under Alan's site that name no package of their own stand in akasha.",
      workingMemory:
        "The stated blocker is gone and so is half the work: `app/questions` was deleted rather than migrated, at `4b763e9df4`. So this is 2 files, not 6, both in `app/hooks`, and neither reaches `@shared/pages-ui` at all. `use-mark-notification-read.ts` imports `@akasha/pages-ui` since `080d49481e` and escapes nowhere, so it could land today. `use-mark-read-on-end.ts` has 2 `~/lib/*` reaches, one fewer since `dc0ebc8f50`. `alanwalton/web/dist/` is stale from 08-31 and re-derives the old counts.",
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
