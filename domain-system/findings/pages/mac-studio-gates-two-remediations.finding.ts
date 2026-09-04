import type { Finding } from "../finding.page-type.ts"

export const macStudioGatesTwoRemediations = {
  id: "01a06555-9f3e-743e-94d2-1f3bca617e70",
  pageTypeSlug: "finding",
  slug: "mac-studio-gates-two-remediations",
  domainSlug: "domain/all-about-alan",
  claim:
    "Two of Alan's dependency remediations wait on the same hardware purchase. Retiring four Anthropic Max subscriptions needs a Mac Studio with 512GB or more of memory to run local models, and that machine is not currently buyable — the plan is blocked on Apple's product cadence, so the standing position is to keep paying and prepare. The same machine is what would make a local model a partial replacement for Google search, so search remediation is blocked behind the same purchase.",
  evidence:
    "My own reading of Abby's backlog at `~/abby-backlog-2026-08-06/`, migrated here as a finding. This folds two items under the BIGTHREE thread of `backlog/personal-freedom.md`: `anthropic-mac-studio` (line 7, was item 1) and `search-remediation` (line 10, was item 53), citing `notes/anthropic-remediation.md` and `notes/information-and-media.md`. The spine records the dependency between them directly (`backlog.md` line 44): the first unblocks the second.\n\nThe substitutes the search item names as available now are Kagi, Perplexity and DuckDuckGo; it holds that the capital path is still the higher-leverage move.\n\nWhat I did not measure: I read neither note, so the four-step sequence and the blocking condition are the backlog's account. I did not check Apple's current line-up, so whether the 512GB configuration is still unavailable as of today is unverified — this was true as the backlog last recorded it on 2026-07-10.",
} as const satisfies Finding
