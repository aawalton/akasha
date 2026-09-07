import type { Initiative } from "../initiative.page-type.ts"

export const athenaCommandsAtTheRoot = {
  id: "01a06d11-9fb0-74b6-9028-01e427fb002d",
  pageTypeSlug: "initiative",
  slug: "athena-commands-at-the-root",
  domainSlug: "workspace-package/command-system",
  personaSlug: "athena",
  intents: [
    {
      statement:
        "Every command sits in one folder at the root, named by the namespace it is under.",
      workingMemory:
        "238 commands and 48 namespaces, 18 top and 30 nested. Every command has one parent: a namespace names 202, the `command` page type names 36, and no domain or package names a command, where 187 such entries sat over 19 pages. Phase 2 moves the folders under one root: `REPAIR_AT` in `calling.module.code.ts` names the index command's code and moves with that command, or a tree holding no index cannot build an index; `tree-drawing.module.code.ts` reaches four command folders by relative path.",
    },
    {
      statement: "A seat holds the commands its domain and role need, without being handed them.",
      workingMemory:
        "This began when the `alan` handler seat could not reach `akasha track session`. Alan wants narrow warrants per use case, not one generic relation, and rejected `partSlugs` as the edge: too broad in what it targets, and it demands a spanning tree, while a command belongs to its namespace and should register to several domains and roles. Wanted: a `command-slugs` relation on `domain`, the `alan` domain naming the `track-session` namespace, and warrants from a seat's domain and role.",
    },
    {
      statement: "Every page is named by exactly one parent.",
      workingMemory:
        "84 pages have two or more parents, steady across four runs at three HEADs while the judged population moved by 132. Five classes: 48 shared property pages (`text-property/title` has 25 namers), 20 a page-type page and an instance both naming an instance, 7 a package and a domain naming one module, 7 two domains naming one package, 2 two domains naming one page type. Candidate rule: a page's one parent is the page owning the folder it sits in; a mere user names it under `properties`.",
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
        "Reading a term's page clears it for every later change, for any file, because `owingOf` owes nothing while the record holds that page at its current blob. Alan ruled this intended: answering a warrant by when something was read is barred, so a re-owed warrant would have no escape. The refusal text contradicted itself and was fixed at 2356754c61. What is left is telling the writer without refusing, and no such channel exists: `troubling` turns any non-empty array into refusals.",
    },
    {
      statement: "An index written as changes land matches what a rebuild would write.",
      workingMemory:
        "Over f9a9633160 the drift read 128 added, 1 changed, 8 taken away: every added one under `path`, the changed one `value/module.jsonl`, every taken one under `relation`. The five added shown are `path/` entries for `.uncommitted.jsonl` sidecars of `code-editor-data-interface`, whose type holds 7 pages, so the rest are other pages' sidecars. A settle refiles only the pages a change carries, and `filingOf` takes a file's own lines as ground truth, so an entry no change touches is never revisited.",
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
