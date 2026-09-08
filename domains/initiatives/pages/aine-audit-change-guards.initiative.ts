import type { Initiative } from "../initiative.page-type.ts"

export const aineAuditChangeGuards = {
  id: "01a07b9d-714b-7d47-a337-a59a3a5219b2",
  pageTypeSlug: "initiative",
  slug: "aine-audit-change-guards",
  domainSlug: "page-type/change",
  personaSlug: "aine",
  intents: [
    {
      statement: "The mode a change runs in is factored out of the changes that carry one.",
      workingMemory:
        "Five kinds cover every combination the change pages use: mechanical and none all false, checked is checks alone, restated adds the writer's reading, authored adds the readers' too. `command-system/calling` already reads a kind off a page's `changeKindSlug` and the three flags off that kind's page, so no computed property is owed. State `changeKindSlug` on every change page, repoint the readers onto that, then take the three flags off `change` and off every page.\n",
    },
  ],
  constraints: [
    "A guard judges the answer a change gives, so what can be judged without that answer is a check.",
    "A guard runs on a mechanical change alone.",
    "A guard is named on the change page rather than reached by an import.",
    "Guards short-circuit, so the first refusal is the whole answer.",
  ],
} as const satisfies Initiative
