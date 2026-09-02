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
      statement: "The code editor's status line shows Claude usage and both readout groups.",
      workingMemory:
        "The bar is 4th fastest of 8 features in every condition, so what Alan reads as slow is the host frozen under it. Muting the observation write took blocked time 11064ms to 945ms, twice over: `observation-store.ts` looks like an HTTP POST and lands in-process, a 117k-file readdir plus 6 spawnSync git children plus a lock spin, fed by three panels polling at 1s. A 10s minimum between flushes was revert-tested and gave nothing, so the write must leave the loop rather than run less often.",
    },
    {
      statement: "The code editor's four panels each show what akasha holds.",
      workingMemory:
        "Timed at `92a183b077`: page-tree 4357ms of a 4506ms activation wall, so Pages is the wall; drawing costs 84ms. Agents halved to 2199 once its poll stopped racing itself and drawing whichever read landed last. Alan's one fast panel is Work, the only one a held-open server answers; Domains, Pages and the bar each spawn a fresh bun per refresh. Domains is dark now: the tree prints 1,256,319 valid bytes and the host reads 1,169,408, stopping on a KiB boundary and saying nothing.",
    },
    {
      statement: "Nothing reads a readout through the markdown engine.",
      workingMemory:
        "The premise inverts: two of the nine lights already ignore the day asked. `email-entry-lowest-inbox-count-today` and `food-entry-plants-since-waking` state no `takes`, so `dayGiven` iterates nothing, throws nothing, and the literal resolves against `Date.now()`. The hourly run scores yesterday from today for those two. Moving the readings widens this from two lights to nine rather than causing it. Read and not run; a lane is asking past days to confirm. Refusal comes before any backfill.",
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
