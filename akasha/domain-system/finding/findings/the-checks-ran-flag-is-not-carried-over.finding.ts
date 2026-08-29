import type { Finding } from "../finding.page-type.ts"

export const theChecksRanFlagIsNotCarriedOver = {
  id: "01a04bdd-596d-768e-95f2-a664804b8b37",
  pageTypeSlug: "finding",
  slug: "the-checks-ran-flag-is-not-carried-over",
  domainSlug: "domain/command-system",
  claim: "The environment flag that disables gating is not being ported, which is a removal and so needs authorising rather than deciding.",
  evidence:
    "Ops reads a checks-already-ran variable in four places, and setting it skips the gate entirely. Nothing in the repository ever sets it: no script, no hook, no test, no continuous integration. It is an ambient environment variable, so it is inherited by every descendant process, it names neither which checks ran nor over which commit, and unlike breaking the glass it leaves no mark in the commit. A shell profile that exported it would silently disable checking for every command anyone ran, and nothing would report that. Breaking the glass is the same capability done well: it demands a reason, it refuses outside akasha, it says plainly that no check ran, and it stamps the reason into the commit message. Carrying that over and leaving this behind is the recommendation, but it removes a capability, so it is the owner's to approve.",
} as const satisfies Finding
