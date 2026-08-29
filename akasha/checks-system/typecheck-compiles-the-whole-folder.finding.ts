import type { Finding } from "../domain-system/finding/finding.page-type.ts"

export const typecheckCompilesTheWholeFolder = {
  id: "01a04bc4-7e87-77cc-b3b7-0840695c3322",
  pageTypeSlug: "finding",
  slug: "typecheck-compiles-the-whole-folder",
  domainSlug: "domain/checks-system",
  claim: "The typecheck check walks the akasha folder and compiles all of it for any change, which is the one thing every other check was rebuilt to stop doing.",
  evidence:
    "A type holds or fails across files, so judging the changed file alone is forward-only: it sees what the file imports and never what imports it. Change an export's signature and every caller breaks while the check reads green, which is the defect `Zero At Landing` exists to prevent. Compiling per changed file is therefore wrong rather than merely slow, and the alternative that would be right needs the files a change reaches, which is a closure, which is the graph. So the check walks `akasha/` with readdirSync and compiles the lot, memoised to one compiler run per process. It is stated on the check's own page rather than hidden. At 115 files it costs 741ms once and nothing thereafter. At ten thousand it is a minute on every patch, and the memo saves nothing across processes. This is the check that does not survive the corpus growing.",
} as const satisfies Finding
