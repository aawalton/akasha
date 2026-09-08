import type { Initiative } from "../initiative.page-type.ts"

export const aranyaRootFolderShape = {
  id: "01a08257-6635-725b-b328-6665c66c0e46",
  pageTypeSlug: "initiative",
  slug: "aranya-root-folder-shape",
  domainSlug: "domain/akasha",
  personaSlug: "aranya",
  parentSlug: "initiative/akasha-folder-shape",
  intents: [
    {
      statement: "The root akasha folder has its own approved folder shape.",
      workingMemory:
        'The root is never judged: `foldersAbove` walks `ancestorsOf`, which stops before `""`, so `""` never enters the judged set. `""` works as a folder key, since `filesIn` and `foldersIn` join it onto the index path tree. `ancestorsOf` is read by `folder-grouping` too, where `""` would file a folder under itself, so the root is added in `foldersAbove` rather than there. `akasha-workspace.workspace.ts` is the only workspace page, so a root shape judges one folder.',
    },
    {
      statement: "The root akasha folder matches its folder shape.",
    },
  ],
} as const satisfies Initiative
