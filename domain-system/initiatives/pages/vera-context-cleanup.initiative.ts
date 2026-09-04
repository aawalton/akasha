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
        "Met at 362c3d16 and 4f2448cf: the folder, the page slug and the package name are all `context`, and `bun install` settled the lockfile. Three places still spell `context-system` and each is right to: a made-up domain in `domain-ancestors.context-warrant.test.ts`, prose in a finding measured 2026-09-02, and one line of amy's `amy-seat-turn-reading` working memory, which is hers to mend.",
    },
    {
      statement: "The context folder tree passes the folder-matches-a-shape check.",
      workingMemory:
        "`akasha audit --check folder-matches-a-shape --file-path context-system` answers 60 files and none refused, so this holds today and the rename is what puts it at risk. Under a parent named `context`, `context-warrants` would open with the name of the page above it and want to be `warrants`. The other three folders, `agent-stated`, `warranting` and `warrant-scratch`, are untouched by it.",
    },
  ],
} as const satisfies Initiative
