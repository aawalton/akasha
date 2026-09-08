import type { Initiative } from "../initiative.page-type.ts"

export const olwenPersonaCleanup = {
  id: "01a08295-df5c-73c1-a6c1-66eae43f078f",
  pageTypeSlug: "initiative",
  slug: "olwen-persona-cleanup",
  domainSlug: "workspace-package/persona",
  personaSlug: "olwen",
  constraints: [
    "The folder is named `personas/` and the package `@akasha/personas`, while the workspace package page beside the persona page type is slugged `persona`, as `domains/` is.",
    "A page keeps the qualifier its slug carries and sits in a folder named without it, as `purpose/` holds `domain-purpose`. Alan settled this.",
    "A page beside the persona page type is a part of the package holding its folder, as the move reads a parent from the folder alone.",
    "Everything about a persona lives under `personas/`, so no sibling folder at the root holds a part of it.",
  ],
  intents: [
    {
      statement: "No persona-system folder is left at the root of the repository.",
      workingMemory:
        "Commit 113fba4023 carried the pages to `personas/` on 2026-09-06 and left 42 empty folders; nothing remains to merge, and `git ls-files persona-system` counts 0. Alan settled that `remove-folder` is the route, and that this is a change though git tracks nothing, as an uncommitted file property is. Only per-edit fields survive the kept-edits jsonl, so the folder rides a fifth edit kind or a flag on `remove`. Filed as `remove-folder-refuses-the-empty-folder-a-move-leaves`.",
    },
  ],
} as const satisfies Initiative
