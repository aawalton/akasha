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
        "file holds add, move and remove across file, file-code, file-page, file-page-type and file-page-property, each with a dispatcher; rename holds file-page and file-page-property. folder holds move and remove across folder and folder-package. file-content holds change across file-content, code and page, with a dispatcher the authored change-file reaches. A file's own rename is that file's carry, add-if-not-present reads no path as a page, and a page type's own slug is renamed by no change.\n",
    },
    {
      statement:
        "Every mechanical change that can leave an edge hanging names the guard judging that edge.",
      workingMemory:
        "`change-file-content-page` and `change-page-page-property` both name `identity-not-already-held` now, and the content dispatcher is thin over them. `relation-reaches-a-page` is left off both, since it would refuse any edit to a page already holding a name that reaches nothing, and whether such pages exist is unread. `add-file` and `remove-file` judge nothing on purpose, the caller judging. `guardedBy` casts from `gathered([world.over, said])`, so no guard reads a stale index.\n",
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
    {
      statement:
        "A command change is refused where that change does the work a mechanical change or a guard does.",
      workingMemory:
        "A check to write, so the boundary holds without an agent reading for it. `akasha refactor retype` composed no change address and built its own file edits, which is the shape the check is to refuse. The address map's own descent gap was found this way: a command doing a mechanical change's work carries that work's defects with no page stating them.",
    },
  ],
  constraints: [
    "A guard judges the answer a change gives, so what can be judged without that answer is a check.",
    "A guard runs on a mechanical change alone.",
    "A guard is named on the change page rather than reached by an import.",
    "Guards short-circuit, so the first refusal is the whole answer.",
  ],
} as const satisfies Initiative
