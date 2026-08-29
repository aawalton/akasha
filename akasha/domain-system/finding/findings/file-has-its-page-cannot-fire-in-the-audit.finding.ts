import type { Finding } from "../finding.page-type.ts"

export const fileHasItsPageCannotFireInTheAudit = {
  id: "01a04d9d-bc95-7f10-800b-e75f5a5f24a2",
  pageTypeSlug: "finding",
  slug: "file-has-its-page-cannot-fire-in-the-audit",
  domainSlug: "domain/checks-system",
  claim:
    "The check refusing a file no page claims can refuse nothing when the audit runs it, because the audit's subjects are derived from exactly the pages that would claim them.",
  evidence:
    "`everythingIn` hands the audit `everyFileIn(root)`, which is every page the index knows plus, for each, the files its `code` and `test` imply. `unclaimedIn` walks that same list and keeps a path only where `standingByPath` finds no page. Every subject is therefore either a page the index carries or a file a page's own value declares, and the indexer files a path entry for both, so the test can never pass. Witnessed: put an unclaimed `akasha/zz.ts` on disk and run the audit — the subject list holds 172 paths, the file is not among them, `unclaimedIn` answers empty and the check answers empty. Hand the same path to the check as a change and it refuses it. So the check's whole force is at patch time, and the audit — the run meant to answer whether a fault was already there — is structurally blind to the one fault this check exists for. Its own refusal says a file no page claims is enumerated by nothing and audited by nothing, which is the exact reason the audit cannot see it. Recorded rather than fixed because the repair is to give the audit a subject list drawn from the tree rather than from the index, which is the walk `index.domain.ts` forbids of an answer, so it is a ruling about what an audit may do rather than a change to this check.",
} as const satisfies Finding
