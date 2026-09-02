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
        "The host was the wall, not the panels: the observation write held the thread 4579ms of every stretch and holds 124ms since `8be23cdcca`. Domains reads fell 10.9 a minute to 4.4 and redraws to 0.75 at `b1b5f17e6e`, once equal bytes stopped being reparsed. What is left is that Pages reads from outside akasha — 3180 of its 3243 rows come from `pages/`, the markdown store, against 63 from akasha. Alan says akasha only, served from the index.",
    },
    {
      statement: "Nothing reads a readout through the markdown engine.",
      workingMemory:
        "Confirmed by running at `9966927988`: asked for five past days, `upkeep-plants` and `inboxes-email` each gave one answer while the seven day-taking lights moved across the same keys. `dayGiven` now refuses a clock-relative query asked for a day that is not the clock's, and the refusal reaches `SourcePointsRefusal`, so no figure is written. All 79 `amy-*` persona-days from 2026-06-11 were scored through it; none was rewritten. Email is un-recomputable past its 13 pages.",
    },
    {
      statement: "The code editor's extension sits in akasha.",
      workingMemory:
        "The escapes were counted as import statements and that undercounted them. Measured transitively at `cec44ee09a`, the extension program holds 197 files outside its folder: tools/ 116, akasha/ 35, page/ 35, repo/ 7, agent/ 2. Six relative reaches became `@tools/lib` names, which changed the spelling and not the program, since the wildcard resolves to raw `.ts`. The readouts reaches went with the values slot. Composite refuses on 60 of these.",
    },
    {
      statement: "Nothing reaches pages through the old query engine.",
      workingMemory:
        "The census is in at `9445bc2c0f` and it inverts the premise: no live page read in the deployed app reaches the pod's own checkout. The second reader is Alan's editor, where `askHere` asks the checkout first and reaches the service only on one refusal word, so a wrong answer and an absent one take the same road. The 262 was no lasting condition, and a reading is written to a `*.uncommitted.*` file and never committed, so no freshness ever carried one.",
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
