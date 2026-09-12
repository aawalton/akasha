import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const deployingTheWorkstationKindByHandRunsPastTheDeployCeiling = {
  id: "01a095f2-eb87-7778-b0a1-071e42b4fe88",
  type: "finding",
  slug: "deploying-the-workstation-kind-by-hand-runs-past-the-deploy-ceiling",
  domain: "domain/infrastructure",
  claim:
    "The workstation kind can be put up only by its deploy loop, because `akasha deploy service-workstation` by hand runs past the 300 seconds that command's page allows.",
  evidence:
    "Three by-hand runs were killed at that ceiling: mine, and two from another seat, one started 07:57:45 and gone by 08:02:45, one started 08:02:58 and gone by 08:08:02. Each held `.git/deploys/service-workstation.lock` for those five minutes, and the loop read the kind as already deploying and put nothing up on every tick meanwhile. The loop itself does not hit the ceiling, because it runs the CLI out of `.git/trees/service-workstation` rather than through `akasha`, and nothing outside the `akasha` command watches a clock.",
} as const satisfies Finding
