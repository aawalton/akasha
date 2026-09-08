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
        "file holds add, move and remove across file, file-code, file-page, file-page-type and file-page-property, each with a dispatcher; rename holds file-page and file-page-property. folder holds move and remove across folder and folder-package. A file's own rename is that file's carry, and add-if-not-present reads no path as a page. What is left is a page type's own slug, which no change renames, and the file-content cells, none of which has a caller yet.\n",
    },
    {
      statement:
        "Every mechanical change that can leave an edge hanging names the guard judging that edge.",
      workingMemory:
        "`rename-file-page` names `claimed-file-not-left-behind`; every other rung landed since is thin over a guarded one. `add-file` and `remove-file` judge nothing on purpose, the caller judging. A page left claiming a file that went is refused by the `page-property-has-its-file` check, which judges any page the index says carries a changed path, so no guard is wanted there. `guardedBy` casts its shadow from `gathered([world.over, said])`, so no guard reads a stale index.\n",
    },
    {
      statement:
        "A content change is judged by the guards that judge an edge into the body that change leaves.",
      workingMemory:
        "An add guard judges the edges out of the new body and a remove guard judges the edges into the path that went, so the inversion is edge direction. A content change is the third case: it breaks an inbound edge while the path survives. `import-not-left-hanging` and `relation-not-left-hanging` both key on `takingIn(given.said)`, so neither fires. Widen the trigger they share rather than writing a third, which `no-rule-in-two-files` would refuse.",
    },
    {
      statement:
        "A change-page-file wraps change-code-file, and the authored change-file routes to it.",
      workingMemory:
        "`change-code-file` is landed. The rename guard belongs on `change-page-file` because id and slug are page properties. `change-file.change-mechanical` refuses inline where the body reads null and needs that body to work the passage out, so that refusal is structural rather than a guard that was missed.",
    },
    {
      statement: "The mode a change runs in is factored out of the changes that carry one.",
      workingMemory:
        "A change answers edits rather than writing them, and some roads take a dry run or a draft. What varies between those roads is a mode the change is handed rather than a branch each change writes.",
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
