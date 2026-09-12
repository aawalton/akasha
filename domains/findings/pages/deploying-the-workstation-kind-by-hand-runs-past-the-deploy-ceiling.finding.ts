import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const deployingTheWorkstationKindByHandRunsPastTheDeployCeiling = {
  id: "01a095f2-eb87-7778-b0a1-071e42b4fe88",
  type: "finding",
  slug: "deploying-the-workstation-kind-by-hand-runs-past-the-deploy-ceiling",
  domain: "domain/infrastructure",
  claim:
    "A deploy loop cannot put up a kind whose deploy runs past the ceiling that command's page states, because only a call can ask to be measured and a loop makes none.",
  evidence:
    "`akasha deploy` states 300 seconds, and `--measured` lifts that for one call. On 12 September the workstation kind was stopped at that ceiling five times inside half an hour: twice from `workstation-deploying`, at 08:18:21 and 08:23:31, each after 302 seconds, and three times by hand from two seats. The ceiling is kept by the CLI wherever it runs, so running it out of `.git/trees/service-workstation` rather than through `akasha` escapes nothing. The measured run that followed reached its refusal in 169 seconds, so what the kills met was a slow moment rather than a deploy that never ends.",
} as const satisfies Finding
