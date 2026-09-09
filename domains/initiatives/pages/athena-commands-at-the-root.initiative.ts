import type { Initiative } from "../initiative.page-type.ts"

export const athenaCommandsAtTheRoot = {
  id: "01a06d11-9fb0-74b6-9028-01e427fb002d",
  pageTypeSlug: "initiative",
  slug: "athena-commands-at-the-root",
  domain: "workspace-package/command-system",
  persona: "athena",
  intents: [
    {
      statement:
        "Tooling specific to the command domain sits under `commands/`, and no other tooling does.",
      workingMemory:
        "All 15 commands and the 28 command property pages are in `commands/`, and `command-system/commands/` has only the `command` page type. `entries` now says a machine writes it, and `machineWrittenAt` reads a property naming its files by section, so a sidecar warrants nothing. The page type's move is refused while 22 command pages in `temper` and `browser` reach it as `@akasha/command-system/command` rather than by path.",
    },
    {
      statement: "No `command-system` folder is there.",
      workingMemory:
        "70 folders sit under `command-system`: `commands/`, holding the `command` page type, and 69 modules, of which `ios-widget-emit` and `ios-widget-swift` are iOS's and nothing imports. The `namespace` and `refactor-command` page types are in `commands/` now. A manifest names a way in even where the reach from outside is spelled as a relative path, so dropping an alias refuses every such reach: 16 were dropped and 12 put back.",
    },
    {
      statement: "The `commands/` folder passes `folder-matches-a-shape`.",
      workingMemory:
        "196 refusals over `commands/` at 440b43ad0a, of 1121 tree-wide. 194 say a folder opens with what the page above it is named, which is what fully qualified slugs make; the constraint on those and the shape rule disagree, and `folder-matches-a-shape` is a check Alan has. 2 say a folder has no page of its own, `commands` and `commands/pages`, and the `command` page type moving to `commands/` answers both.",
    },
    {
      statement: "A command's folder sits inside its namespace's folder under `commands/pages/`.",
      workingMemory:
        "All 42 namespaces are nested under `commands/pages/`, each folder with its namespace page and its commands, to three levels. 34 folders sit at the top: 17 namespaces and 17 commands under no namespace. The 37 of 215 command pages outside `commands/` are left, one reached by a package alias, and `nest-commands` is kept until they are in. The two track tests had failed unseen since 4e0e4b61b3 landed them through the changes, over a scratch repository with no index.",
    },
    {
      statement:
        "Every command sits in one folder at the root, named by the namespace it is under.",
      workingMemory:
        "238 commands and 48 namespaces, 18 top and 30 nested. Every command has one parent: a namespace names 202, the `command` page type names 36, and no domain or package names a command, where 187 such entries sat over 19 pages. Phase 2 moves the folders under one root: `REPAIR_AT` in `calling.module.code.ts` names the index command's code and moves with that command, or a tree holding no index cannot build an index; `tree-drawing.module.code.ts` reaches four command folders by relative path.",
    },
    {
      statement: "A seat has the commands its domain and role need, without being handed them.",
      workingMemory:
        "This began when the `alan` handler seat could not reach `akasha track session`. Alan wants narrow warrants per use case, not one generic relation, and rejected `partSlugs` as the edge: too broad in what it targets, and it demands a spanning tree, while a command belongs to its namespace and should register to several domains and roles. Wanted: a `command-slugs` relation on `domain`, the `alan` domain naming the `track-session` namespace, and warrants from a seat's domain and role.",
    },
    {
      statement: "An instrument that cannot see its subject says so rather than reporting clean.",
      workingMemory:
        "Eight found in one day. `migration-reach` gave `akasha/` as a pathspec and answered empty for everything (fixed 73cbedabc4). `outside-naming` excluded nothing, so `move` swept twice and landed corrupt commits while reporting success (fixed 2a79aee3a7). `tests-pass` returns nothing while `AKASHA_TESTS_RUNNING` is set, which nothing unsets and which every child inherits, and the landing still counts it. A worktree symlinked to its parent ran its own tests against the parent's code.",
    },
    {
      statement: "A dependency change lands through the gate.",
      workingMemory:
        "`bun.lock` is claimed by no page and is far over the file-length ceiling, so any manifest change is refused and the tree cannot install. Two agents broke the glass for this in one day, f72622ce5e and e3f42caf40, the second after a removal left the root manifest naming a package that had gone. The root is now a `workspace` page claiming `package.json` and `bun.lock` (2f4fb60962), which holds. The ceiling that went with it was reverted at 6dbb29146f; Alan is resolving it.",
    },
    {
      statement: "A writer is told when a change writes a taboo term they read once before.",
      workingMemory:
        "Reading a term's page clears it for every later change, for any file, because `owingOf` owes nothing while the record has that page at its current blob. Alan ruled this intended: answering a warrant by when something was read is barred, so a re-owed warrant would have no escape. The refusal text contradicted itself and was fixed at 2356754c61. What is left is telling the writer without refusing, and no such channel exists: `troubling` turns any non-empty array into refusals.",
    },
    {
      statement: "An index written as changes land matches what a rebuild would write.",
      workingMemory:
        "Over f9a9633160 the drift read 128 added, 1 changed, 8 taken away: every added one under `path`, the changed one `value/module.jsonl`, every taken one under `relation`. The five added shown are `path/` entries for `.uncommitted.jsonl` sidecars of `code-editor-data-interface`, whose type has 7 pages, so the rest are other pages' sidecars. A settle refiles only the pages a change has, and `filingOf` takes a file's own lines as ground truth, so an entry no change touches is never revisited.",
    },
  ],
  constraints: [
    "Nothing under `checks/` changes here. Alan holds checks and check tests.",
    "The glass is not broken without Alan saying so, and the reason is written in the commit.",
    "A deletion needs no approval. A directive needs Alan's.",
    "A command's parent is its namespace, and a namespace's is the command page type.",
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
