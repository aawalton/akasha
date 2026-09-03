import type { Finding } from "../finding.page-type.ts"

export const threeReachersOfTheSameClusterApiServerNowStandInsideAkasha = {
  id: "01a06861-24c9-7018-94ad-01664cdb5226",
  pageTypeSlug: "finding",
  slug: "three-reachers-of-the-same-cluster-api-server-now-stand-inside-akasha",
  domainSlug: "domain/akasha-migration",
  claim:
    "Three separate readers of PIPELINE_SA_TOKEN, K8S_API_BASE and K8S_CA_CERT_B64 now stand inside akasha, each caching its own config and building its own request against the same api server. They are near duplicates rather than duplicates: what differs is how a call that does not answer in time ends, and one of those differences is load-bearing for a live daemon. Collapsing them is worth doing and is not free, so it is recorded rather than done.",
  evidence:
    "Measured 2026-09-03 while landing akasha/infrastructure/ci-containers.\n\nThe three. akasha/service-system/cluster-services/cluster-api-reaching/cluster-api-reaching.module.code.ts:22-29 loads the three env vars and caches them at :48-53; its proxyFetch at :59-68 builds `/api/v1/namespaces/<ns>/services/<svc>:<port>/proxy<path>`. akasha/infrastructure/ci-containers/ci-reaper-cluster/ci-reaper-cluster.module.code.ts:13-17 names the same three, caches at :35, and its proxyPath at :65 builds the same string. akasha/infrastructure/ci-containers/ci-dispatch-cluster/ci-dispatch-cluster.module.code.ts:1 reaches a third, @tools/lib/pipeline-run/k8s-fetch, whose config reader at tools/lib/pipeline-run/k8s-fetch.ts:24-27 reads the same three again.\n\nWhy the reaper's was not folded onto cluster-api-reaching. apiFetch takes no method and the reaper deletes containers. And the ceiling differs in kind rather than only in length: withCeiling rejects with a CeilingExceeded that services/ci-container-reaper.ts:99 catches to end the process, where cluster-api-reaching aborts the fetch and would surface an AbortError the daemon does not know. A swap would move a live daemon from a clean restart to an unhandled throw.\n\nThe dispatcher's is a further step out. It reaches k8s-fetch, which is still in tools/lib, so it cannot be collapsed at all until that file moves.",
} as const satisfies Finding
