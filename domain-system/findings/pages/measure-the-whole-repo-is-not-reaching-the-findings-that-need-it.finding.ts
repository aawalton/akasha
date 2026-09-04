import type { Finding } from "../finding.page-type.ts"

export const measureTheWholeRepoIsNotReachingTheFindingsThatNeedIt = {
  id: "01a0680a-6997-75df-928d-856a2cb3e751",
  pageTypeSlug: "finding",
  slug: "measure-the-whole-repo-is-not-reaching-the-findings-that-need-it",
  domainSlug: "domain/akasha-migration",
  claim:
    "`domain/akasha-migration` carries a rule saying to measure a rule's reach across the whole repository and never across the akasha folder alone. A careful finding broke it the same night, and ruled a vocabulary droppable that unmigrated code still defines. The rule is not reaching the agents who need it.",
  evidence:
    "`the-twelve-run-cost-pages-go-and-their-band-vocabulary-goes-with-them` scoped its census to `akasha/` and concluded the seven cost bands were droppable. `tools/lib/run-cost.ts` defines all seven ceilings, instant through eternal, matching the deleted pages exactly. The rule broken is `Measure The Whole Repo` on the initiative's own domain page, carrying the aid `Absence inside akasha is not absence in the repository.`\n\nWhat makes this evidence about the rule rather than about the agent is that the finding is good work otherwise: it seeds its own fault, reads `command/measure` in full to clear a slug trap, and says plainly what it did not establish. An agent doing everything else right still asked the narrower question.\n\nThe same scope carried a second error into it: it says twelve pages and six bands where `f47565f543` took seven, its own subject line saying seven.\n\nThe seven pages are back at `pages/domain/run-cost-*.domain.md` at `75404bd7f4`, so whoever migrates `tools/lib/run-cost.ts` has the prose. Whether the band names are kept at all is Alan's, and is the question that finding left open.",
} as const satisfies Finding
