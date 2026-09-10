import type { Initiative } from "../initiative.page-type.types.ts"

export const athenaCommandsAtTheRoot = {
  id: "01a06d11-9fb0-74b6-9028-01e427fb002d",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "athena-commands-at-the-root",
  domain: "page-type/command",
  persona: "athena",
  intents: [
    {
      statement: "A command Alan has not approved at the root sits inside its namespace's folder.",
      workingMemory:
        "Alan ruled on 2026-09-10 that a command sits at the root only where he approves it by name, and `commands/command.page-type.ts` now carries that as an invariant. He approved `audit` and `read`. Moved since: agent-turn-colors, `index refresh`, `measure complexity`, `measure performance`, `google drive fetch`, `google calendar events`, `icloud fetch`, `ios-app build`, `git push`, `git restore`. Left: `deploy`, moved to the root by another lane in 501dac080fa, unruled.\n",
    },
    {
      statement:
        "Every command sits in one folder at the root, named by the namespace it is under.",
      workingMemory:
        "All 233 command and 56 namespace slugs are exactly their folder path under `commands/pages/` hyphen-joined, and equal their filename stem. The parts close both ways, no orphan and no dangling part. No domain or package names a command any more, where 187 such entries sat over 19 pages. Nothing mechanical holds it: `page-named-as-stated` judges the stem alone, and no check re-derives a slug from its path. The exception covers a top namespace and a root command Alan approved.\n",
    },
    {
      statement: "A seat has the commands its domain and role need, without being handed them.",
      workingMemory:
        "Every seat is handed one document, `agents.agent-settings.harness-settings.json`, whose `permissions.allow` is empty and whose deny list is global; a spawn merges only `remoteControlAtStartup` into it. A seat's persona, role and assignment reach none of it. No relation property targets `page-type/command`, and `alan.domain.ts`, `alan.seat.ts` and `handler.role.ts` name no command. Alan wants narrow warrants per use case and rejected `parts` as too broad. `track session` is a namespace of ten.\n",
    },
    {
      statement: "An instrument that cannot see its subject says so rather than reporting clean.",
      workingMemory:
        "`temper/build-deploy-checks/population-bound` already does this: examined against declared, an empty population where none was declared, and a throw where examined runs past declared. Its ten callers all sit under that folder, and no akasha code-check reaches it. A check answers `Judged` records, so an empty answer means clean, and Fail Closed covers only a check that threw. `outcome.module.ts` states the rule and nothing imports it. The two swept instruments are moot, their subjects deleted.\n",
    },
    {
      statement: "A writer is told when a change writes a taboo term they read once before.",
      workingMemory:
        "`owingOf` keys a reading under the agent and path alone, so one reading clears the term for every later change and any file. `heldTo` hands the page back in the refusal and records that reading, so the first refusal clears itself: the telling is the clearing. A channel that tells without refusing exists already — `report` goes to stdout, refusals to stderr. What is left is routing: `unwarrantedIn`'s one caller pushes into `troubling`, which only refuses, and `Built` has no slot for a notice.\n",
    },
    {
      statement: "An index written as changes land matches what a rebuild would write.",
      workingMemory:
        "The index is 379,411 `.jsonl` files under `.git/data/index/`, in eight kinds. A dry-run refresh reports the drift and writes nothing. Two runs minutes apart at different HEADs gave the same drift, so it is quotable while other lanes land: 80 added, 1 changed, 3 taken away over about 544,880 entries, 0 refused. Settling reaches past the change for identity, path, listing and import; the relation kind alone works over `held`, and 79 of the 80 added are relation entries. No landing catches drift.\n",
    },
  ],
  constraints: [
    "A new check needs Alan's. Changing a check that is there needs no approval.",
    "The glass is not broken without Alan saying so, and the reason is written in the commit.",
    "A deletion needs no approval. A directive needs Alan's.",
    "A command's parent is its namespace unless Alan approved it at the root, and a namespace's is the command page type.",
    "Command and namespace slugs are fully qualified, with no new scope to be unique within.",
    "Packages dissolve, and the root tsconfig covers the commands folder.",
    "The pipeline concept is ablated. `workflow-language` and `workflow-templates` stay.",
    "A clean reading is not believed until the instrument is shown to see a seeded fault.",
    "A filtered count is paired with an unfiltered one before it is quoted.",
    "A regression is attributed by timestamp, never by a matching commit message.",
    "Green is not reached by narrowing what runs.",
    "A test count is quoted with the HEAD it was measured at.",
  ],
} as const satisfies Initiative
