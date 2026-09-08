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
        "100 refusals, each from the one enabled many-page shape `pages-of-the-type-above`. 98 are `personas/days/pages/<date>/`: 97 dated folders and a `1901-01-01` sentinel, holding 2079 persona-day pages and no sidecar, refused for a name that is not `pages` and no page type above them. The 2 left are `questions/pages` and `review-sessions/pages`, meeting every clause but the sidecar one: 252 `.question.context.txt` and 2 `.review-session.notes.txt` beside their pages. Page count is never the fault.",
    },
  ],
} as const satisfies Initiative
