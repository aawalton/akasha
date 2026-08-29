import type { Finding } from "../domain-system/finding/finding.page-type.ts"

export const fourChecksAwaitARuling = {
  id: "01a04bd1-923f-77b5-bc3b-4553abcbb38e",
  pageTypeSlug: "finding",
  slug: "four-checks-await-a-ruling",
  domainSlug: "domain/checks-system",
  claim: "Three of the four unbuilt checks could be built now by letting a check read a named file at an exact path, and that is a policy change rather than a decision.",
  evidence:
    "Three pages say a check reads no file and asks the index instead. Against that, the typecheck page already declares its own breach of the rule in a design line and stands, which sets a precedent that a stated breach is allowed. Taking the same licence would deliver file-has-its-page, page-property-has-its-file and relation-resolves on the worktree and deploy phases, reading exact paths rather than listing anything — much cheaper than the walk typecheck already does, O(1) per changed file. Witness-not-asserted would follow. The reverse direction of page-property-has-its-file stays out of reach either way, because no check is handed a deletion. The alternative is to add the property schema and property file entries to the index and build all four clean. That is more work and leaves no breach behind, and it is the reason this was left for a ruling rather than taken.",
} as const satisfies Finding
