import type { Finding } from "../finding.page-type.ts"

export const aWebAppsHostNamesAreStatedOnAPageAndRoutedFromAFile = {
  id: "01a05b26-f8b6-7ffd-b7e7-e2624681524c",
  pageTypeSlug: "finding",
  slug: "a-web-apps-host-names-are-stated-on-a-page-and-routed-from-a-file",
  domainSlug: "page-type/web-app",
  claim:
    "A web app page now states the host names reaching it, and nothing reads them. The tunnel is still configured from a `tunnel-routes.ts` standing beside each app's source, which no page names. The two agree tonight because they were copied across by hand and checked one by one. Nothing would notice if they stopped agreeing.",
  evidence:
    "The twelve host names stated across the six pages under `akasha/service-system/web-app/web-apps/` were read out of each app's `tunnel-routes.ts` and checked against the cluster: `audhdalan.com` answered 200 while `kubectl get deploy web -n audhdalan` matched the page on kind, namespace, resource name, image, replicas, container port and working directory. `infra/k8s/src/cloudflared` reads the routes files and no page. One route was left off on purpose: temper's `dev.tempereso.com` points at `web.temper-dev`, a workload in another namespace, so it reaches no web app the pages describe. A check binding the two was written and could not stand: `akasha test` runs a module's tests in a scratch tree holding what the change carries, so `deployableNamed` there lists no web app page and reaches no `tunnel-routes.ts`. Three tests reading the real repository failed for that reason and were dropped before the module landed. What would close this is the cloudflared configuration being emitted from the pages, at which point the routes files go; until then the page's `hostnames` is a second spelling bound by nothing. The web app page type carries a gap invariant saying the tunnel is routed from what stands there.",
} as const satisfies Finding
