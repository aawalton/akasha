import type { TunnelRoute } from "./tunnel-route/tunnel-route.module.code.ts"

export const routes: TunnelRoute[] = [
  {
    name: "git",
    hostname: "git.alanwalton.com",
    service: "http://git-transport.git.svc.cluster.local:3000",
  },
  {
    name: "grafana",
    hostname: "grafana.alanwalton.com",
    service: "http://auth-proxy.auth-proxy.svc.cluster.local:3080",
  },
  {
    name: "supabase",
    hostname: "supabase.alanwalton.com",
    service: "http://auth-proxy.auth-proxy.svc.cluster.local:3080",
  },
]
