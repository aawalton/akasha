import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const aLandingJudgesOnlyWhatThatLandingCarries = {
  id: "01a08dea-fe42-712f-88be-65b324f8c798",
  pageTypeSlug: "finding",
  type: "finding",
  slug: "a-landing-judges-only-what-that-landing-carries",
  domain: "domain/testing-system",
  claim:
    "A landing runs the tests beside the files that landing carries, so a fault beside a file nothing has touched goes unjudged for as long as nothing touches it.",
  evidence:
    "Two faults came to light in one day, both only because a mechanical rewrite touched their folders. 43 workstation service pages name run paths whose files moved, and the test that judges them runs only where a change carries a file under `services`. `bfb45c4aaff` took the forty-five-minute rule out of readout serving and rewrote that assertion in four of the five smilingjenny route tests; the fifth went on asserting the old rule and no landing since had carried it. Neither fault is old code nobody reads: both are judged by a test that passes when it runs and is not run.",
} as const satisfies Finding
