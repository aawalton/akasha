import type { Finding } from "../finding.page-type.ts"

export const everyWebAppHoldsItsBuildOnOneNode = {
  id: "01a05b08-26f6-7003-ac30-d9e8f8f02f09",
  pageTypeSlug: "finding",
  slug: "every-web-app-holds-its-build-on-one-node",
  domainSlug: "page-type/cluster-service",
  claim:
    "All six web apps run on the one node labelled for serving, and each keeps its checkout and its build in a folder on that node's disk. A pod restart is safe only because the pod comes back to the same node. If that node is ever lost or relabelled, every site starts with no build at all.",
  evidence:
    '`kubectl get nodes -o json` shows `alanwalton.com/workload-class.serve` on `node-04` alone among the six nodes, and every web app\'s pod template carries `workloadClassMemberSelector("serve")`. `kubectl get pods -o wide` puts all six web pods on `node-04`. `infra/k8s-types/src/orchestrator-cache-locations.ts` gives each app a `CacheLocation` with `backing: "hostPath"` at `/var/<app>-web-cache`, and `orchestrator-cache-helpers.ts:7-22` mounts it at `/app`, with the checkout at `/app/repo`. The init container at `orchestrator-cache.ts` fetches origin and runs `git reset --hard origin/main` on every start, then `bun install --frozen-lockfile`; it never builds, and `build/` is ignored by git, so the build a pod serves is whatever the last successful deploy left in that folder. I scaled `audhdalan/web` to nothing and put it back with `akasha deploy audhdalan-web`; the new pod reached ready in fourteen seconds and the site answered 200, because the folder on `node-04` still held the build made on 2026-08-28. Two things follow. A node drain that moved a web app would leave it serving nothing. And the tailnet egress finding\'s worry about state that does not outlive a pod is the same worry one layer down: this state outlives the pod but not the node.',
} as const satisfies Finding
