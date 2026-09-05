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
        "227 commands, 31 namespaces (19 top, 12 nested), 34 loose. A command's parent follows the command tree, not the domain tree: command page type, namespace, command. Phase 1 drops 187 `command/...` entries from 19 domain pages and rewrites `command.page-type.ts` to 53. Phase 2 must repoint `ROOTED_AT` and move `index` together or `akasha index` cannot start. Phase 3 is 10 disjoint agents over 218 pages. No namespace is minted yet, against a control of 228 commands.",
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
