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
        "Commit 113fba4023 carried the pages to `personas/` on 2026-09-06 and left 42 empty folders behind. Nothing remains to merge: `git ls-files persona-system` counts 0. `remove-folder` refuses the folder because it holds no file, and `clearedOff` sweeps only a folder the same landing emptied, so no act reaches it. Filed as the finding `remove-folder-refuses-the-empty-folder-a-move-leaves`. Waiting on Alan for the route.",
    },
    {
      statement: "The personas-core package is merged into the personas package.",
      workingMemory:
        "21 modules, 68 files, 21 exported subpaths, one with a consumer outside: `alan/web` imports `@akasha/personas-core/wallpaper-order`. A workstation service runs a module by repo path, and `alan-harness.domain.ts` names the package as a part. `move-folder` carries a folder and repoints paths, but leaves both manifests and both package pages alone, and refuses a module imported by package alias until that import is repointed.",
    },
    {
      statement: "The personas/ folder passes the folder-matches-a-shape check.",
      workingMemory:
        "Clean as of 2026-09-08, judged by `akasha audit --check folder-matches-a-shape --file-path personas`, whose one refusal is the repository root rather than anything under `personas/`. To be judged again once the two merges land, since each carries folders in.",
    },
  ],
} as const satisfies Initiative
