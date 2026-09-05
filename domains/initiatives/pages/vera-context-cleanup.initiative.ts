import type { Initiative } from "../initiative.page-type.ts"

export const veraContextCleanup = {
  id: "01a06d62-864e-7da2-8e20-813302d6a5fd",
  pageTypeSlug: "initiative",
  slug: "vera-context-cleanup",
  domainSlug: "workspace-package/context",
  personaSlug: "vera",
  intents: [
    {
      statement: "All context files are organized in the context/ folder.",
      workingMemory:
        "Met at 362c3d16 and 4f2448cf: folder, page slug and package name are all `context`. The rename left `asking` and `patch` importing `@akasha/context-system`, which resolved only through a node_modules link no manifest names; repointed at f292fa40 and proved by deleting that link. What still spells the old name is prose: a made-up domain in `domain-ancestors.context-warrant.test.ts`, a finding measured 2026-09-02, and amy's working memory, which is hers to mend.",
    },
    {
      statement: "The context folder tree passes the folder-matches-a-shape check.",
      workingMemory:
        "`akasha audit --check folder-matches-a-shape --file-path context` answers none refused over 58 files. `context-warrants` became `warrants` in the move that renamed the package. `warrant-scratch` folded into the fixtures beside `warranting`, being test scaffolding rather than a module. `agent-stated` and `warranting` sit under `modules/` as of d65b1071 and beafc049, leaving `modules` and `warrants`.",
    },
  ],
} as const satisfies Initiative
