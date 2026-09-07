import type { Initiative } from "../initiative.page-type.ts"

export const nimueCodeCleanup = {
  id: "01a07693-7ea9-7fa0-ab70-5d8e33381c8c",
  pageTypeSlug: "initiative",
  slug: "nimue-code-cleanup",
  domainSlug: "workspace-package/code-system",
  personaSlug: "nimue",
  intents: [
    {
      statement: "All code-system files are in the code/ folder.",
      workingMemory:
        "377 files are under `code-system`. `code/` is free: the domain `code` was absorbed into the package, and no domain page carries that slug now. `code.file-property.ts` carries the slug `code` under another page type, which no workspace package collides with. `rename-page` alone leaves the folder unmoved, a package's page never owning its folder, so the folder move waits on a change nothing composes yet.",
    },
    {
      statement: "The code folder tree passes the folder-matches-a-shape check.",
      workingMemory:
        "`akasha audit --check folder-matches-a-shape --file-path code-system` answers no refusal over 377 files, the page `code-audit-ast-unused` having become `audit-ast-unused` so that its folder is named for it. What is left is the move itself: the same call over `code` is what this intent waits on, and there is no `code` folder yet.",
    },
  ],
} as const satisfies Initiative
