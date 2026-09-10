import type { Initiative } from "../initiative.page-type.types.ts"

export const aranyaRootFolderShape = {
  id: "01a08257-6635-725b-b328-6665c66c0e46",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "aranya-root-folder-shape",
  domain: "domain/akasha",
  persona: "aranya",
  parent: "initiative/akasha-folder-shape",
  intents: [
    {
      statement: "The root akasha folder has its own approved folder shape.",
      workingMemory:
        'The root is never judged: `foldersAbove` walks `ancestorsOf`, which stops before `""`, so `""` never enters the judged set. `""` works as a folder key, since `filesIn` and `foldersIn` join it onto the index path tree. `ancestorsOf` is read by `folder-grouping` too, where `""` would file a folder under itself, so the root is added in `foldersAbove` rather than there. `akasha-workspace.workspace.ts` is the only workspace page, so a root shape judges one folder.',
    },
    {
      statement: "The root akasha folder matches its folder shape.",
      workingMemory:
        "99 root folders beside `node_modules`, `.git` and `.supervisors`: `akasha.domain.ts` declares 58 and leaves 41 undeclared. Of those 41, 36 have a page another page names, 32 of them by `alan/harness/alan-harness.domain.ts`, and 5 have no page at all: `commands`, `infra`, `persona-system`, `person-system`, `version`. The 13 root files are the 2 pages, 9 the workspace page states, `tsconfig.tsbuildinfo` whose optional property that page leaves unstated, and one churning `.uncommitted.ts` scratch.",
    },
  ],
} as const satisfies Initiative
