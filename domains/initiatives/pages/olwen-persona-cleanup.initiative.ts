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
        "`personas/` holds 2,995 tracked files, the package is named `@akasha/personas`, and `persona.page-type.ts` sits paired with `persona.workspace-package.ts` at its root. What is left is `persona-system/`, holding 40 untracked `*.persona.uncommitted.ts` sidecars no move carried; `akasha remove` refuses a folder holding untracked files, and a shell write into the checkout is refused too.",
    },
    {
      statement: "The personas/ folder passes the folder-matches-a-shape check.",
      workingMemory:
        "The check refuses 110 times: 108 under `persona-days/`, one for `questions/pages`, one for `review-sessions/pages`. Each says the folder holds many pages where a-domain-with-its-parts takes one, and 97 dated folders sit under `persona-days/pages/`. `domains/initiatives/pages/` holds pages and refuses nothing, so a `pages/` folder is legal in some shape, and what tells the two apart is not yet read.",
    },
  ],
} as const satisfies Initiative
