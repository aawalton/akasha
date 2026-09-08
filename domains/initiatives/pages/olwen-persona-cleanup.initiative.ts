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
      statement: "The personas/ folder passes the folder-matches-a-shape check.",
      workingMemory:
        "98 refusals, all `personas/days/pages/<date>/`, and they go with the concept rather than being reshaped. `questions/pages` and `review-sessions/pages` are clean now: each page carrying a sidecar was folded into a folder of its own, 279 and 2 of them, which is the remedy the shape names. Page count is never the fault; a sidecar beside a page file is, and so is a folder named for anything but `pages`.",
    },
    {
      statement: "No persona-day is left in the repository.",
      workingMemory:
        "2079 pages over 97 dated folders and a `1901-01-01` sentinel, one page type, five properties under `personas/days/properties/`. Nothing draws them: no tsx, command or check names persona-day, and the one writer `persona-day-points` has no caller. `green-day-points` is the persona's own and survives. 83 pages of Alan's daily tracking carry 185 persona-day ids. Waiting on the two change acts Alan approved on 2026-09-08.",
    },
  ],
} as const satisfies Initiative
