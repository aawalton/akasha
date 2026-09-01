import type { Finding } from "../finding.page-type.ts"

export const theClusterPageStoreIsTheWorkstationBehindAProxy = {
  id: "01a05b6b-c39e-7bf4-9cf9-ba5a31e641c7",
  pageTypeSlug: "finding",
  slug: "the-cluster-page-store-is-the-workstation-behind-a-proxy",
  domainSlug: "module/store-reaching",
  claim:
    "The store the cluster reaches is not a second store. `page-store.page-store.svc.cluster.local:8787` is a proxy forwarding to `workstation.alanwalton.ts.net:8787`, which is the store a workstation also reaches at `127.0.0.1:8787`. A page committed and indexed on the workstation is live to the cluster at once, with no push and no second index. The cluster holds no page store of its own, so it reads nothing while that workstation sleeps or leaves the tailnet.",
  evidence:
    "The pod behind the service runs one process, and it is `socat -d -d TCP-LISTEN:8787,fork,reuseaddr PROXY:tailnet-egress.tailnet-egress.svc.cluster.local:workstation.alanwalton.ts.net:8787,proxyport=1055`. It mounts no repository: its only volume is the service account token, and it holds no checkout and no index.\n\nThe workstation stands at `100.64.0.4` on the tailnet, and its store listens on `127.0.0.1:8787` and on `100.64.0.4:8787`, so the cluster reaches the same process the workstation does.\n\nTwo device secret pages were committed on the workstation and never pushed, with origin/main thirty-nine commits behind. Asking `page-store.page-store.svc.cluster.local:8787` from inside the `alanwalton` web pod answered with both pages, ids and hashes matching what the workstation had just written. One store explains that and two do not.\n\nWhat follows is that pushing to origin is not what makes a page reachable from the cluster, and that a rebuilt index on the workstation is. It also follows that the store's durability is the workstation's disk rather than the cluster's, which no manifest says.",
} as const satisfies Finding
