import type { Finding } from "../finding.page-type.ts"

export const threatCategoriesUnnamed = {
  id: "01a06555-9f3f-706e-8ccb-40112d3f89f9",
  pageTypeSlug: "finding",
  slug: "threat-categories-unnamed",
  domainSlug: "domain/all-about-alan",
  claim:
    "Enshittification is the only threat Alan's dependency framework treats explicitly, and five siblings go unnamed: sudden denial of service through account closure, discontinuation or an identity-based ban; surveillance and data extraction; capture, where a trustworthy organisation turns untrustworthy through acquisition or a change of leadership; lock-in, where switching cost is grown deliberately; and cascading dependency, where depending on one thing creates another.",
  evidence:
    'My own reading of Abby\'s backlog at `~/abby-backlog-2026-08-06/`, migrated here as a finding. Carried in `backlog/personal-freedom.md` line 36 as `FRAME/threat-categories` (was item 7), which names `notes/enshittification.md` as holding the primary threat and lists the five siblings needing explicit treatment.\n\nWhat I did not measure: I did not read `notes/enshittification.md`, so whether the siblings are wholly absent or mentioned in passing is unknown to me — the item asks for explicit treatment, which is compatible with either. Capture in particular is clearly handled somewhere, since `notes/capture-events.md` exists and other items lean on it, so "unnamed" holds for the threat taxonomy rather than for the corpus as a whole.',
} as const satisfies Finding
