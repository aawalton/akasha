import type { Initiative } from "../initiative.page-type.ts"

export const migrateAlanAndJennyToAkasha = {
  id: "01a05431-37d9-7a21-ad2f-423df6ef1ac1",
  pageTypeSlug: "initiative",
  slug: "migrate-alan-and-jenny-to-akasha",
  domainSlug: "domain/alan-harness",
  personaSlug: "amy",
  intents: [
    {
      statement: "The code editor's extension sits in akasha.",
      workingMemory:
        "20 modules landed. Hinge `command-server-client` is IN (cb7cbb64c5) unblocking 44 files. ZERO import cycles and ZERO class blockers. `observation-writer` got a host-crash mend (1456c8a32e): an ask in the same tick as a dispose killed the extension host — bun hides it and node shows it so test that path under node. Drafts ready to land sit in /tmp/amy-assemble, /tmp/amy-writer-main, /tmp/amy-smalls, /tmp/amy-seat3. Do NOT rename the pid-and-start-time type: its term page's kept sense covers it.",
    },
    {
      statement: "Nothing reaches pages through the old query engine.",
      workingMemory:
        "NOT blocked by the extension. At least 16 live entrypoints still write the old engine, in 4 families: the editor; the agent message-claim path writing `pages/message`; 9 timers and daemons; 2 CLIs live on commit. Clearing intent 1 closes none of them. Both old samples are floors — mtime counts files touched, not writes (one page, 4 rewrites in 10 min), and every non-editor writer is slower than that 1-hour window. `tools/lib/page-rows-write.ts` is a separate row engine, unaudited.",
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
        "1 file left. `use-mark-notification-read.ts` landed at `013216479c` as `akasha/alan/web/use-mark-notification-read`, its one importer repointed and the old file deleted at `070d3b25d1`. What remains is `use-mark-read-on-end.ts`, held back by 2 reaches — `~/lib/offline-text` and `~/lib/read-completion` — neither of which exists under akasha. So this waits on the interior, as intent 3 does. `alanwalton/web/dist/` is stale from 08-31 and re-derives the old counts.",
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
