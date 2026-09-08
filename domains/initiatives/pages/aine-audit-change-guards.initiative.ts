import type { Initiative } from "../initiative.page-type.ts"

export const aineAuditChangeGuards = {
  id: "01a07b9d-714b-7d47-a337-a59a3a5219b2",
  pageTypeSlug: "initiative",
  slug: "aine-audit-change-guards",
  domainSlug: "page-type/change",
  personaSlug: "aine",
  intents: [
    {
      statement: "Every sensible combination of mode, type and subtype has a mechanical change.",
      workingMemory:
        "file holds add, move and remove across file, file-code, file-page, file-page-type and file-page-property, each dispatched; rename holds the three page subtypes, a file with no page renaming by its carry. folder holds move and remove over folder and folder-package, and says why it makes and renames neither. file-content holds add, change, remove and rename over its parts, and move over a property value alone. No rung moves a page property, a record or a type member.\n",
    },
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
        "The three flags a run mode is made of, `runsChecks`, `readersOweReading` and `writerOwesReading`, are stated on every change page and narrowed to false by `change-mechanical`. The mechanical runner restates them as one constant, and that is the only branch of its kind in the changes. The runner reaches mechanical changes alone, so the constant is its own kind made concrete rather than a second place the flags are held. Nothing here takes a dry run or a draft yet.\n",
    },
  ],
  constraints: [
    "A guard judges the answer a change gives, so what can be judged without that answer is a check.",
    "A guard runs on a mechanical change alone.",
    "A guard is named on the change page rather than reached by an import.",
    "Guards short-circuit, so the first refusal is the whole answer.",
  ],
} as const satisfies Initiative
