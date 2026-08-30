import type { Finding } from "../finding.page-type.ts"

export const theGraphCarriesNoFolder = {
  id: "01a05047-6045-7290-9b78-252f18c4e51b",
  pageTypeSlug: "finding",
  slug: "the-graph-carries-no-folder",
  domainSlug: "domain/graph-system",
  claim:
    "The graph carries no folder node and no edge for what a folder holds, so folder questions are answered by arithmetic over the path instead. One check works out both the near and the far reach of a folder by hand and joins each against the import edge, and the type it answers with carries two facts no shape reads.",
  evidence:
    "In `folder-matches-a-shape.check.code.ts`, `folderOf` at 39-42 and `ancestorsOf` at 44-52 are the near and far reach of what holds a file; 175 and 177 are the same read the other way. `reachedFolders` at 54-62 and `enteringOf` at 137-151 join that reach against the import edge to ask which folder a name crosses, and `enteringOf` lays the pending change over the import index by hand because no layer beneath it will. `folder-shape.page-type.ts:13,17` declares `deep` and `entered`, the check works both out at 182 and 186, and no shape reads either: the reach was foreseen and had nowhere to stand. What a folder holds needs no index, being the path up to its last `/`, so it would be the second edge the graph works out rather than reads, beside the loader edge, and working an edge out has never been built. `everyPath` is pages and the files they state, not every file on disk, so what a folder holds stands on `file-has-its-page` refusing anything else.",
} as const satisfies Finding
