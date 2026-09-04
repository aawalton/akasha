import type { Finding } from "../finding.page-type.ts"

export const theWidgetsAuthorizationHasNoCacheAndNoFallback = {
  id: "01a05d5b-2c40-7b17-9e42-8a3c61f04d72",
  pageTypeSlug: "finding",
  slug: "the-widgets-authorization-has-no-cache-and-no-fallback",
  domainSlug: "domain/alan-harness",
  claim:
    "The widget's reading tolerates 45 minutes of workstation downtime and its authorization tolerates none.",
  evidence:
    "`/api/categorization` admits on a device secret and a grant, and resolving either makes 2 or 3 sequential `/ask` calls. Those do not answer in the cluster. `infra/k8s/src/page-store/page-store.cluster-service.code.attachment.ts:13` runs `alpine/socat:1.8.0.3` and `:44` dials `PROXY:tailnet-egress...:workstation.alanwalton.ts.net:8787`, so the in-cluster page-store is a bare TCP forwarder with no application behind it. The server is `page-query-service` on Alan's workstation, listening on `100.64.0.4:8787` and `127.0.0.1:8787`, answering from the index value rows in this checkout. The whole chain is widget to alanwalton.com to the web pod to socat to tailnet-egress to the workstation. The asymmetry is the finding. A reading is pushed every 5 minutes and held in the pod for 45, so it rides out a sleeping workstation for about 45 minutes. Authorization is pulled per request and held nowhere, so it rides out none: `store-questioning.module.code.ts:162-206` always posts to `/ask` with no local-checkout branch, and `route-access.module.ts:29` states that as intended. The failure is a 500 rather than a 401. An unreachable store makes `deviceSecretPresented` answer `unread`, which makes `resolveDeviceSecretContext` throw at `alanwalton/web/app/device-secret/lib/device-secrets.server.ts:35`; the widget reads that as `.unreachable`, falls back to its 45-minute cache, then draws an em dash. This is live rather than theoretical: `page-query-service` restarted at 08:10:47 MDT today. Each restart is a window in which no request can be authorized. The 15-second client timeout is tighter than it reads, because those 2 or 3 queries traverse a tailnet hop to a laptop-class host.",
} as const satisfies Finding
