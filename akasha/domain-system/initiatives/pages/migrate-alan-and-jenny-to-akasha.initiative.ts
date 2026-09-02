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
      statement: "The code editor's extension sits in akasha.",
      workingMemory:
        "First piece landed (`2abf58d75d`), but it made a SECOND empty package, not a conversion: the source manifest is the editor's own with 14 commands; the akasha one is a 6-line stub. Merge it in BEFORE repointing any symlink, or the editor loses 14 commands while `editor-extension-single` reads green through that link. 11 symlinks now, not 10. The exports bypass is cleared (`65d0200352`, `0895e7cae9`). 82/77/1, `.server` zero and the seven `@tools/lib` reaches hold.",
    },
    {
      statement: "Nothing reaches pages through the old query engine.",
      workingMemory:
        "The write half still runs but has narrowed to one writer. Measured 09-02 near 15:00: 13 `pages/**.uncommitted.yaml` touched in an hour, down from 86, every one a `code-editor-group-tab`, `code-editor-group` or `code-editor-window`, with 2 `observation-writer-main` processes live. The last reach through the old write engine is the code editor observation writer, so the extension intent above blocks this one. The read half was severed at `fbf73c4710`; `f9307ff1dc` put two entry modules back.",
    },
    {
      statement: "The interior of Alan's site stands in akasha.",
      workingMemory:
        "124 files now, from 128: `capacitor-bridge`, `api-origin`, `api-fetch` and `capacitor-cors` landed under `akasha/alan/web` at `e11669e66a` and `dc0ebc8f50`, taking 11 of routes' 71 escapes. 60 of the 128 imported no interior file at all, so ordering is the only bar left. The real block is the `.server` marker, in finding `akasha-cannot-spell-the-server-marker`. It rules out `idle`, read as the clean next landing at 47 files: `idle/lib` carries 4 marked files.",
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
