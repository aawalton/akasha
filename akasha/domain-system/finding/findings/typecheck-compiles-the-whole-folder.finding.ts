import type { Finding } from "../finding.page-type.ts"

export const typecheckCompilesTheWholeFolder = {
  id: "01a04bc4-7e87-77cc-b3b7-0840695c3322",
  pageTypeSlug: "finding",
  slug: "typecheck-compiles-the-whole-folder",
  domainSlug: "domain/checks-system",
  claim: "The typecheck check walks the akasha folder and compiles all of it for any change, which is the one thing every other check was rebuilt to stop doing.",
  evidence:
    "A type holds or fails across files, so judging the changed file alone is forward-only: it sees what the file imports and never what imports it. The alternative that would be right needs the files a change reaches, which is a closure over the import graph. So `everyIn` walks `akasha/` with readdirSync and `foundIn` builds one program over the lot. It is stated on the check's own page as a constraint rather than hidden. Nothing is memoised: three calls in one process cost 1021ms, 742ms and 605ms, the fall being warm-up rather than a cache, so the folder is compiled from nothing on every run. At 184 files that is the dominant cost of a gate that answers a one-file change in 1.25s. The graph that closure wants now stands: `import/path/<path>.jsonl` names every file importing a given path, so what is left is to take the roots from it rather than from a walk. At ten thousand it is a minute on every patch. This is the check that does not survive the corpus growing.",
} as const satisfies Finding
