import type { Finding } from "../finding.page-type.types.ts"

export const aPlanWhoseEveryAddressResolvesTodayIsTheBrokenPlan = {
  id: "01a088a7-84db-7129-958c-4b29a14b04fb",
  pageTypeSlug: "finding",
  type: "finding",
  slug: "a-plan-whose-every-address-resolves-today-is-the-broken-plan",
  domain: "change-agent-file-content",
  claim:
    "A scoped address is `<page-type>/<scope>/<slug>`, where the scope segment is the target's own scoping value rather than part of the target's name. An act rewriting that value therefore rewrites every address naming the target. A plural act reads each line against the world the lines before it leave, so one line in a call can bring into existence the address a later line names. Together these mean a plan recording each target's address as it reads today is wrong for exactly those lines whose target an earlier line rescopes, and wrong in the direction of looking right, because every address in such a plan resolves at the moment the plan is written. Validating a plan by confirming every address in it resolves passes the broken plan and refuses the correct one.",
  evidence:
    "Worked out by the lane flattening `alan/books` while building a 265-line plan to restate `sectionOf`, and confirmed against pages already landed. `second-passport.book-section.ts` carries `sectionOf: \"my-projects\"`, so its address is `book-section/my-projects/second-passport`. `eu-citizenship.book-section.ts` carries that full address as its own `sectionOf`, and its scope segment is therefore `second-passport`, the parent's slug alone. `austria.book-section.ts` names it as `book-section/second-passport/eu-citizenship` and resolves today. `reaching.module.code.ts` resolves a scoped address by filing on `scopeValue`, which is what the index derived from the target's scoping edge rather than the text the page holds, which is why the two spellings differ. The lane's correct plan is 226 lines whose addresses resolve and 39 whose addresses resolve to nothing until the first 226 land; its own first draft recorded all 265 as they read that day, which would have refused 39 lines for a reason reading as a missing page when the truth was not yet. The general form is that a plan over a graph an act reshapes cannot be checked against the graph before the act runs, so a per-line refusal naming its line is the only validation there is.",
} as const satisfies Finding
