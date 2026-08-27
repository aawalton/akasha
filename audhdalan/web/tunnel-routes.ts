interface TunnelRoute {
  name: string
  hostname: string
  service: string
}

export const routes: TunnelRoute[] = [
  {
    name: "audhdalan",
    hostname: "audhdalan.com",
    service: "http://web.audhdalan.svc.cluster.local:3000",
  },
]
