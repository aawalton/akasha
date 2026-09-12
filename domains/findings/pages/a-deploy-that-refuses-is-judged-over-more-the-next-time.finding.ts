import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const aDeployThatRefusesIsJudgedOverMoreTheNextTime = {
  id: "01a09620-63a9-77e2-82e5-03ad26951eac",
  type: "finding",
  slug: "a-deploy-that-refuses-is-judged-over-more-the-next-time",
  domain: "domain/infrastructure",
  claim:
    "A deploy that refuses is judged over a wider change the next time, so a kind whose deploy falls behind grows less likely to catch up rather than more.",
  evidence:
    "A deploy is judged over the diff from the commit it last put up to the commit it is putting up, narrowed to what it is built from. The workstation kind last put a commit up at 07:04 on 12 September. By 08:50 that diff was 780 commits and 2849 files, and the run took about 195 seconds. What the kind is built from is the union over every workstation service plus the CLI the deploy runs, which is 1174 files, so the tests beside most of the repository are in the run and any red test anywhere refuses the deploy. Six tests under `pages/indexes` and `pages/service`, which no workstation service reads, are what refused it at 08:56.",
} as const satisfies Finding
