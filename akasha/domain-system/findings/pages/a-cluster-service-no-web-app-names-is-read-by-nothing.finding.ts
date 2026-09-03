import type { Finding } from "../finding.page-type.ts"

export const aClusterServiceNoWebAppNamesIsReadByNothing = {
  id: "01a06587-c73c-7b40-9f21-6c1a7e0b8d34",
  pageTypeSlug: "finding",
  slug: "a-cluster-service-no-web-app-names-is-read-by-nothing",
  domainSlug: "domain/akasha-migration",
  claim:
    "Every reader of a cluster service page enters through a web app page, so the new calendar-sync page states a whole CronJob that no akasha code path reaches. What puts that CronJob up is the CI workflow template, which reads no page at all.",
  evidence:
    '`deployableNamed` at akasha/service-system/cluster-services/web-app-reading/web-app-reading.module.code.ts line 105 is the only caller of `pagesUnder(root, ".cluster-service.ts")`, and it starts from a `.web-app.ts` page and follows the `clusterServiceSlugs` that page states. The one command that calls it is `akasha deploy`, whose `kindNamed` at akasha/command-system/commands/deploy/kind-reading/deploy-kind-reading.module.code.ts line 33 dispatches on web app pages and ios app pages alone. `akasha service` reads akasha/service-system/workstation-services/service-reading, not these.\n\nSo a sibling `cron-service` page type would have been read by even less: `pagesUnder` globs the `.cluster-service.ts` suffix, and infra/k8s-synth/src/manifests.ts line 26 discovers manifest code by the `**/*.cluster-service.code.attachment.ts` glob, so renaming either file drops the CronJob out of the only machinery that does reach it today. That is why calendar-sync landed as a cluster service and `replicas` and `container-port` went to `required: false` instead.\n\nWhat the relaxation does not lose: `CLUSTER_SERVICE_NEEDS` at line 21 of that same module still requires both of a page a web app deploy rests on, and refuses by name where a page states neither.\n\nWhat is still open: `akasha deploy calendar-sync` refuses, because no web app page carries that slug. workload-deploying already handles the kind, since `ROLLED_OUT` holds only Deployment, StatefulSet and DaemonSet, so a CronJob is checked with `kubectl get` and waits on no rollout. What is missing is an entry: a kind for a cluster service named directly, alongside `web-app` and `ios-app`.',
} as const satisfies Finding
