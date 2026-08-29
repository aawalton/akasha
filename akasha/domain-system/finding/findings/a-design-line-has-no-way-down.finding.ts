import type { Finding } from "../finding.page-type.ts"

export const aDesignLineHasNoWayDown = {
  id: "01a04d4d-b0e5-7481-abf7-d16562d09a1b",
  pageTypeSlug: "finding",
  slug: "a-design-line-has-no-way-down",
  domainSlug: "domain/domain-system",
  claim:
    "A design entry that has gone false is rebutted on the page breaking it rather than moved to intent, so no domain's design reads as true until every page beneath it has been searched for a denial.",
  evidence:
    "Design is an invariant that holds now and intent is one that does not hold yet, so a line that was true and is now knowingly breached has nowhere to go. Three are breached today, all by typecheck: `A check is run over the changes it was given, and never over the corpus` on checks-system, and `A check looks for no files` and `A check that must know more than the file it was handed asks the index, never the tree` on the check page type. Typecheck answers on its own page, saying the walk `is against A check looks for no files` and stands until a graph can name the files a change reaches. That is honest and it runs the wrong way. A domain's lines are written to reach every page beneath it, so they flow down; an exception written on a leaf flows up, and nothing indexes it, so a reader who trusts the parent is wrong and a reader who does not must read the whole subtree. A fourth line carries the tell in its own words: `A check states its phases, because nothing yet derives them from what the check reads`. An invariant saying yet is an intent. The asymmetry is in domain-system's own rules. Intent carries Resolve When Found, which moves an entry out when it comes true. Nothing anywhere moves a design entry out when it goes false, so invariants can only be promoted, and the pressure leaves as prose on the leaf. Recorded rather than fixed because the missing piece is a rule on design, and a rule is a directive, which is a changed line in a domain.",
} as const satisfies Finding
