import type { Initiative } from "../initiative.page-type.ts"

export const olwenPersonaCleanup = {
  id: "01a06d80-f837-7845-8ef8-bfccd653aab4",
  pageTypeSlug: "initiative",
  slug: "olwen-persona-cleanup",
  domainSlug: "workspace-package/persona",
  personaSlug: "olwen",
  constraints: [
    "The folder is named `personas/` and the package `@akasha/personas`, while the workspace package page beside the persona page type is slugged `persona`, as `domains/` is.",
    "A page keeps the qualifier its slug carries and sits in a folder named without it, as `purpose/` holds `domain-purpose`. Alan settled this.",
    "A page beside the persona page type is a part of the package holding its folder, as the move reads a parent from the folder alone.",
  ],
  intents: [
    {
      statement: "All persona files are organized in the personas/ folder.",
      workingMemory:
        "`personas/` holds 2,995 files across 15 folders, and `personas/` is one its workspace package declares no part for. 9 files carry 11 spellings of `@akasha/persona-system` and nothing outside reaches in by a relative path, so the npm rename is small. Nothing claims `workspace-package/persona`, and the persona page type already states `personas` as its plural.",
    },
    {
      statement: "The personas/ folder passes the folder-matches-a-shape check.",
      workingMemory:
        "The check refuses 102 times over `personas/`. 96 are the dated folders under `persona-days/pages/`, each holding a page per persona where a shape takes one. The rest are the package root, `personas/` holding three pages at its own root, and the `pages/` folders under `questions/` and `review-sessions/`.",
    },
  ],
} as const satisfies Initiative
