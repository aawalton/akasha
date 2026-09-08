import type { Initiative } from "../initiative.page-type.ts"

export const aineAuditChangeGuards = {
  id: "01a07b9d-714b-7d47-a337-a59a3a5219b2",
  pageTypeSlug: "initiative",
  slug: "aine-audit-change-guards",
  domainSlug: "page-type/change",
  personaSlug: "aine",
  intents: [
    {
      statement:
        "Every mechanical change that can leave an edge hanging names the guard judging that edge.",
      workingMemory:
        "`change-file-content-page` names `identity-not-already-held` and `relation-reaches-a-page`, and the content dispatcher is thin over it, so every authored `change-file` on a page is judged. `akasha audit --check relation-resolves` judged 120541 files and refused none, so no page held a hanging name for the guard to trip on. `change-page-page-property` names only the first, a composition passing through it. `add-file` and `remove-file` judge nothing on purpose, the caller judging.\n",
    },
    {
      statement:
        "A content change is judged by the guards that judge an edge into the body that change leaves.",
      workingMemory:
        "`change-page-page-property` names no guard and restates any key, `slug` included. `rename-page-slug` reaches it for exactly that and repoints the namers afterwards, so a guard on that rung would refuse the rename's own middle step. Such a guard belongs on the outermost mechanical change of a family rather than on a rung a composition passes through. `relation-not-left-hanging` cannot see the hanging name at all, a name that no longer resolves being no namer.\n",
    },
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
