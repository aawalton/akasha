import type { Initiative } from "../initiative.page-type.ts"

export const veraGraphCleanup = {
  id: "01a06cc5-ebb2-749d-9dde-1b929dd43573",
  pageTypeSlug: "initiative",
  slug: "vera-graph-cleanup",
  domainSlug: "workspace-package/graph",
  personaSlug: "vera",
  intents: [
    {
      statement: "All graph files are organized in the graph/ folder.",
      workingMemory:
        "The folder and the package are both named `graph`, and the six parts the package states stand under it. No page of a graph type stands outside it. One line of `book-chapter-010` still spells `graph-system`, listing the layers a past architecture had, which is history rather than an address. The import-graph modules under `checks/cluster-checks` are the last graph code outside, and Alan is ablating that folder with thea.",
    },
    {
      statement: "The graph folder tree passes the folder-matches-a-shape check.",
      workingMemory:
        "`akasha audit --check folder-matches-a-shape --file-path graph` answers 21 files and none refused, in seconds where a whole run takes fifteen minutes: `--file-path` narrows what the checks see and `--check` alone does not. Five folders opened with `graph`, the name of the page above them, and became `asking`, `closure`, `attributes`, `edges` and `nodes`. No slug changed, since `strippedOf` takes the name a folder wants to be its page's plural slug less the parent's.",
    },
  ],
} as const satisfies Initiative
