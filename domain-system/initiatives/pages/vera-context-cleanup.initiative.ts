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
        'The folder and the package are both named `context-system` today, so this intent asks for the rename the graph package took from `graph-system` to `graph`. Nothing outside holds a context page: the one file elsewhere spelling `pageTypeSlug: "context-warrant"` is `read.command.test-fixtures.ts`, which builds a warrant for a test rather than standing as one. Eight files across `command-system` import `@akasha/context`.',
    },
    {
      statement: "The context folder tree passes the folder-matches-a-shape check.",
      workingMemory:
        "`akasha audit --check folder-matches-a-shape --file-path context-system` answers 60 files and none refused, so this holds today and the rename is what puts it at risk. Under a parent named `context`, `context-warrants` would open with the name of the page above it and want to be `warrants`. The other three folders, `agent-stated`, `warranting` and `warrant-scratch`, are untouched by it.",
    },
  ],
} as const satisfies Initiative
