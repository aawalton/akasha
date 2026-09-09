import type { Initiative } from "../initiative.page-type.ts"

export const athenaCommandsAtTheRoot = {
  id: "01a06d11-9fb0-74b6-9028-01e427fb002d",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "athena-commands-at-the-root",
  domain: "workspace-package/command-system",
  persona: "athena",
  intents: [
    {
      statement:
        "Tooling specific to the command domain sits under `commands/`, and no other tooling does.",
      workingMemory:
        "At 7470a0274e all 220 command pages sit under `commands/` and none outside, under 47 namespaces, with the `command` page type at `commands/command.page-type.ts` and no package alias left reaching it. Code outside `commands/` reaches modules under `commands/modules/`, and that breaks nothing: `commands/` is no package, so the root manifest names every file in it. What is left is `scratching`, `rooting` and `fault-saying`, which the constraint on `checks/` holds.",
    },
    {
      statement: "No `command-system` folder is there.",
      workingMemory:
        "3 folders sit under `command-system` at 7470a0274e, down from 70: `scratching`, `rooting`, `fault-saying`. Mending `change-imports` to read the manifest (56a514a7a3) let every move carry its alias reachers, and `move-folder` strikes the source manifest's own export lines itself, so no separate edit follows it and no fold cascades. 35 files under `checks/` reach the three, of 228 tree-wide; moving them rewrites those 35, which this initiative forbids.",
    },
    {
      statement: "The `commands/` folder passes `folder-matches-a-shape`.",
      workingMemory:
        "A run scoped to `commands/` answers 2 refusals at 7470a0274e, of 727 tree-wide, down from 196 of 1121 at 440b43ad0a. One is the repository root, which is not under `commands/`. The other is `commands/pages`: `pages-of-the-type-above` asks each subfolder for a page of the type above it, and 47 namespace folders sit there, since `namespace` extends `domain` rather than `command`. Every remedy is a folder shape under `checks/`.",
    },
    {
      statement: "A command's folder sits inside its namespace's folder under `commands/pages/`.",
      workingMemory:
        "Every parent edge under `commands/` is checked: 208 nested commands each named by the namespace whose folder holds them, 12 top commands and 22 top namespaces named by the command page type, 25 nested namespaces named by the namespace above. None unnamed. Each reading was made by an instrument first shown to catch a seeded fault. Whether the 12 want namespaces is Alan's. The two track tests had failed unseen since 4e0e4b61b3 landed them, over a scratch repository with no index.",
    },
    {
      statement:
        "Every command sits in one folder at the root, named by the namespace it is under.",
      workingMemory:
        "Every one of the 220 command and 47 namespace slugs is exactly its folder path under `commands/pages/` joined by hyphens, read by an instrument first shown to catch a seeded mismatch. No domain or package names a command among its parts, where 187 such entries sat over 19 pages. What is left is the 12 commands under no namespace, which the `command` page type names directly, so either those 12 want namespaces or the constraint wants the exception written in.",
    },
    {
      statement: "A seat has the commands its domain and role need, without being handed them.",
      workingMemory:
        "This began when the `alan` handler seat could not reach `akasha track session`. Alan wants narrow warrants per use case, not one generic relation, and rejected `partSlugs` as the edge: too broad, and it demands a spanning tree, while a command belongs to its namespace and answers to several domains and roles. Nothing is built: no such relation is anywhere and `alan` names no command. The name wants settling, since `partSlugs` is `parts` now, and the example names a namespace.",
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
        "At dd781e3529 the index takes the whole tree: 541356 entries, 0 refused. The 1 refused was thea naming `check`, which reaches two pages. The drift cannot be quoted while other lanes land a relation rename — added read 12794 then 12094 over read-only calls minutes apart — and `move-folder` is no source, since nine moved modules each have the new import entry and no old one. A settle refiles only the pages a change has, so an entry no change touches is never revisited.",
    },
  ],
  constraints: [
    "A new check needs Alan's. Changing a check that is there needs no approval.",
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
