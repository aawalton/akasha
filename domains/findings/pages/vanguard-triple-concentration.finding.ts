import type { Finding } from "../finding.page-type.ts"

export const vanguardTripleConcentration = {
  id: "01a06555-9f3f-71c7-bb01-c7a527c7937e",
  pageTypeSlug: "finding",
  slug: "vanguard-triple-concentration",
  domainSlug: "domain/all-about-alan",
  claim:
    "Alan's invested assets sit entirely at Vanguard and entirely in VTIAX — three concentrations stacked on each other: one institution, one fund, one asset class. It is the single largest financial dependency he has. The argument holding it in place is structural, that Vanguard's mutual ownership insulates it, and recent complaints about service quality are possible early signs of that insulation weakening.",
  evidence:
    "My own reading of Abby's backlog at `~/abby-backlog-2026-08-06/`, migrated here as a finding. Carried in `backlog/personal-freedom.md` line 27 as `VENDOR/vanguard-concentration` (was item 13), following the banking audit and citing the income section of `notes/personal-context.md` for the 100% figures and `notes/trust-criterion.md` for the trust assessment. The item flags it explicitly as the single largest financial dependency.\n\nWhat I did not measure: I read neither note and looked at no account, so both 100% figures are the backlog's. The service-quality complaints are reported there as possible early signals, not as established decline, and I did not check them. The spine records a separate finance reconciliation on 2026-07-07 (`backlog.md` line 87) whose figures I did not compare against these.",
} as const satisfies Finding
