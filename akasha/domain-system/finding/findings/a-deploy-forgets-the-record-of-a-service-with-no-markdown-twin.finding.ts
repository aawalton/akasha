import type { Finding } from "../finding.page-type.ts"

export const aDeployForgetsTheRecordOfAServiceWithNoMarkdownTwin = {
  id: "01a05c17-6c32-712c-9fc6-81d162bf7980",
  pageTypeSlug: "finding",
  slug: "a-deploy-forgets-the-record-of-a-service-with-no-markdown-twin",
  domainSlug: "page-type/cluster-service",
  claim:
    "`ops deploy` lists services by markdown glob and hands that list to a recursive delete, so a cluster service whose page has moved to `.ts` with no `.md` twin loses its applied-state record the next time any other service deploys. Nothing is wrong today: the six migrated pages all still have twins, and the deploy cache does not exist. Both are things a person takes away to finish the split.",
  evidence:
    "`deploy-system/service/service.ts:30-33` lists services by two globs, `*.cluster-service.md` and `*.workstation-service.md`. `ops-cli/global/deploy/deploy.command.code.attachment.ts:215-218` hands that list to `forgetGone`, unconditionally on the apply path; the `--dry-run` return at :212 stands before it. `closure.ts:57-59` forwards to `cache/cache.ts:71-80`, which walks the deploy cache and calls `rmSync` with recursive and force on every entry not in the list, so a slug the globs miss is taken away rather than left alone. After a removal `appliedAt` (`closure.ts:41-44`) reads nothing, `heldBack` (`deploy:61-77`) returns null, and the guard that would have said there is nothing to apply is gone, so the next deploy re-applies the manifests and re-runs the in-pod build at `deploy:256-290` though the cluster already serves that commit. Six cluster services have migrated: alanwalton-atlas, alanwalton-web, archive-of-worlds-web, audhdalan-web, smilingjenny-web and temper-web. Each still has a `.md` twin, so each is listed today. Separately, `.git/answers/` holds only keep, outcome and said, so `cache.ts:74` returns at its existsSync guard and nothing is walked. The three migrated workstation-service pages have no twin, but `deploy:195` refuses a workstation service, so none of them holds a record to lose. Read from source; I did not run `ops deploy` with or without --apply. The call taken: filed rather than fixed, because the choice between teaching the glob to see `.ts` and making `forget` refuse a list that lost entries belongs with whoever finishes the split.",
} as const satisfies Finding
