import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const migrationSystem = {
  id: "01a0654f-b626-78f5-9584-1f935da5bd36",
  pageTypeSlug: "workspace-package",
  slug: "migration-system",
  definition: "what every migration of the old system into akasha is run through",
  manifest: "json",
  partSlugs: [
    "module/migration-landing",
    "module/migration-reach",
    "command/migration-reach",
    "module/part-census",
    "command/part-census",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A migration composes the new bodies first.",
    },
    {
      invariantKind: "departure",
      statement: "A migration lands the composed bodies here in batches.",
    },
    {
      invariantKind: "departure",
      statement: "A migration asks whether the old files may go only after the landing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A landing is `migrationLanded(root, migration)` in `@akasha/migration-system/migration-landing`.",
    },
    {
      invariantKind: "departure",
      statement: "The migration handed in states `calledAs` as the name of the migrating program.",
    },
    {
      invariantKind: "departure",
      statement: "The migration handed in states `subject` as the folder being migrated.",
    },
    {
      invariantKind: "departure",
      statement: "The migration handed in states `composed` as the bodies to land.",
    },
    {
      invariantKind: "departure",
      statement: "The migration handed in may state `files` or `bytes` to size a batch.",
    },
    {
      invariantKind: "departure",
      statement: "The migration handed in may state `haltAfter` or `landing` or `saying`.",
    },
    {
      invariantKind: "departure",
      statement: "Each body composed states a `path` under the root.",
    },
    {
      invariantKind: "departure",
      statement: "Each body composed states a `body` of text or of bytes or of nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "Each body composed may state a `together` to keep one page's files in one commit.",
    },
    {
      invariantKind: "departure",
      statement: "What came back is read against the disk with `readBack(root, composed)`.",
    },
    {
      invariantKind: "departure",
      statement: "A landing is never believed from the code a landing answered.",
    },
    {
      invariantKind: "departure",
      statement: "A landing says on standard error every batch that landing refused.",
    },
    {
      invariantKind: "constraint",
      statement: "A migration that says nothing landed every batch of that migration.",
    },
    {
      invariantKind: "departure",
      statement:
        "A sweep is `reachOver(root, paths, told)` in `@akasha/migration-system/migration-reach`.",
    },
    {
      invariantKind: "departure",
      statement:
        "The `told` handed to a sweep maps an old path to the akasha path composed from that path.",
    },
    {
      invariantKind: "departure",
      statement: "A sweep is run after the landing rather than before the landing.",
    },
    {
      invariantKind: "departure",
      statement: "Only the paths `takeableIn(reaches)` answers are composed as removals.",
    },
    {
      invariantKind: "departure",
      statement: "A removal lands the way every other body lands.",
    },
    {
      invariantKind: "departure",
      statement: "An agent sweeps from a shell as `akasha migration-reach --paths-from <file>`.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing outside akasha is removed on any other ground.",
    },
    {
      invariantKind: "departure",
      statement: "A file is reached on its slug and its fields rather than on its page id.",
    },
    {
      invariantKind: "departure",
      statement:
        "A sidecar is judged on evidence of the sidecar rather than on the page beside the sidecar.",
    },
    {
      invariantKind: "departure",
      statement: "A page type absent from akasha is answered apart from a slug absent from akasha.",
    },
    {
      invariantKind: "constraint",
      statement: "Content regrouped at another grain reads as unreached rather than as reached.",
    },
    {
      invariantKind: "constraint",
      statement: "A folder unreached here may be migrated already under another page type.",
    },
    {
      invariantKind: "constraint",
      statement: "`takeableIn` alone is no ground for calling a folder unmigrated.",
    },
    {
      invariantKind: "departure",
      statement: "A landing here runs no check.",
    },
    {
      invariantKind: "departure",
      statement: "`akasha audit` is run after a set of landings here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows what any one old page means.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows what page type an old page becomes.",
    },
    {
      invariantKind: "constraint",
      statement: "Every body goes through the formatter as that body lands.",
    },
    {
      invariantKind: "constraint",
      statement: "A folder of a thousand files costs a thousand formatter runs.",
    },
  ],
} as const satisfies WorkspacePackage
