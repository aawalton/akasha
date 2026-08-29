import type { Finding } from "../finding.page-type.ts"

export const typecheckCompilesTheWholeFolder = {
  id: "01a04bc4-7e87-77cc-b3b7-0840695c3322",
  pageTypeSlug: "finding",
  slug: "typecheck-compiles-the-whole-folder",
  domainSlug: "domain/checks-system",
  claim: "The typecheck check walks the akasha folder and compiles all of it for any change, which is the one thing every other check was rebuilt to stop doing.",
  evidence:
    "A type holds or fails across files, so judging the changed file alone is forward-only: it sees what the file imports and never what imports it. The alternative that would be right needs the files a change reaches, which is a closure, which is the graph. So `everyIn` walks `akasha/` with readdirSync and `foundIn` builds one program over the lot. It is stated on the check's own page as a constraint rather than hidden. Nothing is memoised: three calls in one process cost 1615ms, 1214ms and 1147ms, the fall being warm-up rather than a cache, so the folder is compiled from nothing on every run. At 176 files that is the dominant cost of a gate that answers a one-file change in 1.62s. At ten thousand it is a minute on every patch. This is the check that does not survive the corpus growing.",
} as const satisfies Finding
