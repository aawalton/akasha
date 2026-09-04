import type { Finding } from "../finding.page-type.ts"

export const mintMobileTrustReset = {
  id: "01a06555-9f3e-748f-adc5-1eceb2baf3f3",
  pageTypeSlug: "finding",
  slug: "mint-mobile-trust-reset",
  domainSlug: "domain/all-about-alan",
  claim:
    "T-Mobile's acquisition of Mint Mobile, closed in 2024, is a capture event under Alan's own framework, which resets the vendor's trust to zero regardless of how the service currently behaves. The household's cellular still runs on it, and no alternative has been evaluated against his trust criterion.",
  evidence:
    "My own reading of Abby's backlog at `~/abby-backlog-2026-08-06/`, migrated here as a finding. Carried in `backlog/personal-freedom.md` line 25 as `VENDOR/mint-mobile` (was item 4), which records the acquisition as triggering a capture event per `notes/capture-events.md` and names US Mobile, Visible, Cricket and prepaid options as the alternatives to weigh against `notes/trust-criterion.md`.\n\nWhat I did not measure: I read none of those notes, so the trust-reset rule is the backlog's statement of Alan's framework rather than the framework's own words. That the household still uses Mint is implied by the item asking for a reassessment rather than stated outright, and I did not confirm it. I did not verify the acquisition or its closing date independently.",
} as const satisfies Finding
