interface TunnelRoute {
  name: string
  hostname: string
  service: string
}

export const routes: TunnelRoute[] = [
  {
    name: "atlas",
    hostname: "atlas.alanwalton.com",
    service: "http://atlas.alanwalton.svc.cluster.local:3000",
  },
]
