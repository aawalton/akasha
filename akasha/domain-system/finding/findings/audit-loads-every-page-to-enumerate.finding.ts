import type { Finding } from "../finding.page-type.ts"

export const auditLoadsEveryPageToEnumerate = {
  id: "01a04bc4-7e87-7dcf-bc5d-ff56d3d9a5f0",
  pageTypeSlug: "finding",
  slug: "audit-loads-every-page-to-enumerate",
  domainSlug: "domain/checks-system",
  claim: "Audit executes every page in the corpus merely to work out which files exist, before it has judged anything, and the index it could read instead now holds the answer.",
  evidence:
    "`everyFileIn` reads the page list from the index cheaply, then calls `statedIn` on each one, which requires the page module to read its `code` and `test`. At 117 pages that is 117 module executions to build a list of 172 files, none of it judgement. The reason first given for it no longer holds. The index does record the files a page property holds: `identity/page/path/<path>.jsonl` carries an entry for every page property file as well as for every page, filed by `pathsOf`, so `page-address.module.test.ts` has a line of its own and the whole list is on disk without a page being opened. Audit does not read it. At the stated target of a million files this is a million module executions to build a list, which is the same shape of mistake as walking the tree and costs more. Recorded rather than fixed because switching the enumeration over changes what `everythingIn` means, and there is no command to run an audit from to witness it — `everythingIn` and `auditingIn` are reached by their own test and by nothing else.",
} as const satisfies Finding
