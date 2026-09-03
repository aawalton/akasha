import type { Finding } from "../finding.page-type.ts"

export const ssdiAssetComplianceUnconfirmed = {
  id: "01a06555-9f3e-7f38-b4ce-3b6ba3f72d9f",
  pageTypeSlug: "finding",
  slug: "ssdi-asset-compliance-unconfirmed",
  domainSlug: "domain/all-about-alan",
  claim:
    "Legacy savings accounts at UCCU exist for a specific reason: to keep household assets off the books of relatives who receive SSDI, where exceeding an asset cap would cost them their benefit. Whether each custodial arrangement actually meets the Social Security Administration's asset-attribution rules has never been confirmed, and the documentation discipline that would keep the arrangement defensible is unrecorded.",
  evidence:
    "My own reading of Abby's backlog at `~/abby-backlog-2026-08-06/`, migrated here as a finding. Carried in `backlog/personal-freedom.md` line 20 as `AUDIT/ssdi-compliance` (was item 46), surfaced from `notes/government-services.md#social-security-administration` and pointing at the UCCU entry in `notes/banking.md`.\n\nWhat I did not measure: I read neither note, so both the purpose of the accounts and their unconfirmed status are the backlog's account. I did not look up any SSA rule, so my clause about an asset cap costing a benefit is the item's framing restated, not law I checked. I did not establish how many arrangements there are or who holds them, and nothing in what I read says the arrangement is out of compliance — only that compliance is unconfirmed.",
} as const satisfies Finding
