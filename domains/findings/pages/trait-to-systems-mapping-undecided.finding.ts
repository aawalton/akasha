import type { Finding } from "../finding.page-type.ts"

export const traitToSystemsMappingUndecided = {
  id: "01a06555-9f3f-7bef-b22c-d53b7d0c1d5e",
  pageTypeSlug: "finding",
  slug: "trait-to-systems-mapping-undecided",
  domainSlug: "domain/all-about-alan",
  claim:
    "Each of Alan's executive-function traits, autism traits and aphantasia effects is meant to have a matching treatment of the system that compensates for it, and the mapping does not exist. Whether the systems side should mirror the traits side file for file or aggregate by category of system is also undecided, so the structure has to be settled before the mapping can be built.",
  evidence:
    "My own reading of Abby's backlog at `~/abby-backlog-2026-08-06/`, migrated here as a finding. Carried in `backlog/audhd.md` line 104 as `HARNESS/trait-systems-map` (was item 6), described there as the top-down complement to a bottom-up catalogue of burnout coping that has already landed.\n\nThe structural choice is the entry's own and it is what makes this more than a task: the decision has to be made on capture, and the cross-reference subsections in every trait file depend on it.\n\nThe second half of the claim is my reading of the ordering — the entry states both parts without saying one blocks the other. I judged the dependency obvious enough to state and have marked it as mine.\n\nWhat I did not measure: I opened no note. How many trait files exist, which is the size of the mapping, I did not count.",
} as const satisfies Finding
