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
        "The three flags a run mode is made of, `runsChecks`, `readersOweReading` and `writerOwesReading`, are stated on every change page though `change-mechanical` narrows all three to false. A declaration default cannot carry them: `default-value` says a default does not make a required property optional, and nothing turns a default's text into a boolean. `page-matches-its-type` excuses a computed property, so reading the three off the change kind is the way out.\n",
    },
  ],
  constraints: [
    "A guard judges the answer a change gives, so what can be judged without that answer is a check.",
    "A guard runs on a mechanical change alone.",
    "A guard is named on the change page rather than reached by an import.",
    "Guards short-circuit, so the first refusal is the whole answer.",
  ],
} as const satisfies Initiative
