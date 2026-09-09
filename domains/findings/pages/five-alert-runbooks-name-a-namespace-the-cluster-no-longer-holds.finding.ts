import type { Finding } from "../finding.page-type.ts"

export const fiveAlertRunbooksNameANamespaceTheClusterNoLongerHolds = {
  id: "01a08232-bdd6-72d3-b63d-1e678cca611a",
  pageTypeSlug: "finding",
  slug: "five-alert-runbooks-name-a-namespace-the-cluster-no-longer-holds",
  domain: "page-type/alert",
  claim:
    "Five alert runbooks hand a reader `kubectl -n ci`, and the `ci` namespace went with the pipeline engine. Four of them name a `git-mirror-probe` job and one a `domain-expiry-probe` CronJob, and this repository declares neither. The conditions the alerts name still matter, so the alerts are worth keeping, but the checks their runbooks hand a reader cannot be run and the gauges they speak of have no producer left. What each runbook should tell a reader instead is a choice nobody has made.",
  evidence:
    "The five are `git-mirror-refs-behind`, `git-mirror-probe-unauthenticated`, `git-mirror-metric-absent`, `git-mirror-destination-unreachable` and `domain-registration-expiry-metric-absent`, all under `infrastructure/alerts/pages/`, each in its `.alert.runbook.txt` file.\n\nA search of the tree for `git-mirror-probe` and `domain-expiry-probe` answers those runbooks and one alert page, and no manifest, workflow or cron declaration anywhere. `1c02013903` removed `pages/workflow-template/workflow-domain-expiry-probe.declaration.attachment.ts` and `1273996bd7` removed `pages/package/infra-git-mirror-probe.package.md`, both long before the workflow templates were ablated in `e1dfab8`, so neither probe was among the thirty-seven templates that went.\n\nThe alert page type already carries the gap `No rule this repository deploys raises any alert here.`, so none of the five fires from anything today; what is wrong is narrower than that gap, and outlives it. The runbook property carries the departure `A runbook outlives the deployment gap the alert that runbook belongs to sits in.`, which is why the prose is worth mending rather than deleting.",
} as const satisfies Finding
