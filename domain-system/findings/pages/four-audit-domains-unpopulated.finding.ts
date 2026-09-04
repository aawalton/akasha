import type { Finding } from "../finding.page-type.ts"

export const fourAuditDomainsUnpopulated = {
  id: "01a06555-9f3e-78d0-9b21-d1ffb6c90867",
  pageTypeSlug: "finding",
  slug: "four-audit-domains-unpopulated",
  domainSlug: "domain/all-about-alan",
  claim:
    "Four domains of Alan's dependency audit stand unpopulated while the rest are worked. Housing holds mortgage or rent, water, electric, gas, sewer, trash and property tax. Communications holds his internet provider, mobile carrier, email provider and the source his phone number ports from. Energy holds the electric grid as a system distinct from the utility relationship, vehicle and heating fuel, and any solar or battery. Income holds employers, clients and business arrangements. None has a note.",
  evidence:
    "My own reading of Abby's backlog at `~/abby-backlog-2026-08-06/`, migrated here as a finding. This folds four items under the AUDIT thread of `backlog/personal-freedom.md`: `housing` (line 15, was item 11), `communications` (line 16, was item 14), `energy` (line 17, was item 15) and `income` (line 18, was item 16). Each names the dependencies its domain would hold and the note it would become, and none is anything else, which is why I took the four as one observation about the audit's coverage.\n\nWhat I did not measure: I did not look in the books repository to confirm that `notes/housing.md`, `notes/communications.md`, `notes/energy.md` and `notes/income.md` are absent — \"none has a note\" rests on the backlog carrying all four as unpopulated on 2026-07-10. The contents listed for each domain are the items' own inventories, not a survey of his actual dependencies.",
} as const satisfies Finding
