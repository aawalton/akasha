import type { Finding } from "../domain-system/finding/finding.page-type.ts"

export const deploySelectsNothing = {
  id: "01a04bc4-7e86-75eb-97a4-bd99818492df",
  pageTypeSlug: "finding",
  slug: "deploy-selects-nothing",
  domainSlug: "domain/checks-system",
  claim: "The deploy phase names itself but selects nothing, because selecting is what the graph was for.",
  evidence:
    "A deploy is meant to run the checks whose closures intersect it. A closure is the set of files whose change could change a check's answer, and nothing derives one until the graph system lands. So `runs-on` is a stated list rather than a derived one, and every check states all three phases, which makes patch, worktree and deploy identical runs over whatever change set they are handed. The phase is built and empty in the same way the old system's worktree phase was built and empty, which is worth watching: that one stayed empty long enough for `ops worktree merge` to gate on a stamp that meant nothing. When closures arrive, `runs-on` should be derived and this property should go.",
} as const satisfies Finding
