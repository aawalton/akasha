import type { Finding } from "../finding.page-type.ts"

export const deploySelectsNothing = {
  id: "01a04bc4-7e86-75eb-97a4-bd99818492df",
  pageTypeSlug: "finding",
  slug: "deploy-selects-nothing",
  domainSlug: "domain/checks-system",
  claim: "The deploy phase names itself but selects nothing, because selecting is what the graph was for.",
  evidence:
    "A deploy is meant to run the checks whose closures intersect it. A closure is the set of files whose change could change a check's answer, and nothing derives one: no graph and no closure stands in the folder. So `runs-on` is a stated list rather than a derived one, and its own page files the derivation as an unmet gap. Of the fourteen checks, thirteen state all three phases and one states none, so patch, worktree and deploy select an identical set and are identical runs over whatever change set they are handed. Nothing even asks for the other two: the only caller that runs is `gateBuilt`, which hardcodes patch, and `judgingIn` and `auditingIn` are reached by no caller at all. The phase is built and empty in the same way the old system's worktree phase was built and empty, which is worth watching: that one stayed empty long enough for `ops worktree merge` to gate on a stamp that meant nothing. When closures arrive, `runs-on` should be derived and this property should go.",
} as const satisfies Finding
