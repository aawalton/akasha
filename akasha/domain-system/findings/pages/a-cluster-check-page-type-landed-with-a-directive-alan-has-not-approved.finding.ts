import type { Finding } from "../finding.page-type.ts"

export const aClusterCheckPageTypeLandedWithADirectiveAlanHasNotApproved = {
  id: "01a0680e-6672-7910-a2ca-4d1102cfd5d1",
  pageTypeSlug: "finding",
  slug: "a-cluster-check-page-type-landed-with-a-directive-alan-has-not-approved",
  domainSlug: "domain/akasha-migration",
  claim:
    "The `cluster-check` page type landed carrying a directive named Counted Or Held, which the Alan Approves Directives rule on `page-type/domain` covers and Alan has not approved in its new form. It is the old markdown page type's rule carried across word for word rather than a rule written here, but carrying a rule across is still landing one.",
  evidence:
    "`akasha/checks/cluster-checks/cluster-check.page-type.ts` landed at 31fed1b0f55c8b564b6105f225411cd1615f8e08 with a `directives` list holding one rule, Counted Or Held: `State a least count for a check's subject and what it rests on, or hold the check.` Its warrant and both aids are taken from the `# Rules` section of `pages/page-type/cluster-check.page-type.md`, which stood until commit fb018236ed ablated it; the old text is readable at `git show fb018236ed^:pages/page-type/cluster-check.page-type.md` and in the backup at `/var/home/walton/repos/akasha-backup-2026-09-02/pages/page-type/cluster-check.page-type.md`.\n\nThe gate did not judge this. Constraint 15 lands a migration through `landedMechanically`, which runs no check and no warrant, so the Alan Approves Directives rule was never applied. Constraint 7 releases the approval for the migration and asks for this finding instead.\n\nTwo further things landed in the same commit that Alan may want to look at. The page type is the akasha successor to a type ablated while 59 live pages at `pages/cluster-check/*.cluster-check.md` still declared `page-type-slug: cluster-check`, so it was landed to close a dangling type under live data rather than after a design review. And `runner-name` was dropped from the design as duplicating the slug: nothing in live code reads it, the only hit across the repo being a finding page, but the old dispatch configuration in `tools/lib/check-workflow/check-configs*.ts` is hardcoded rather than read off these pages, so nothing would have reported a loss either way.",
} as const satisfies Finding
