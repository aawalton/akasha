interface TunnelRoute {
  name: string
  hostname: string
  service: string
}

export const routes: TunnelRoute[] = [
  {
    name: "innworld",
    hostname: "innworld.wiki",
    service: "http://web.innworld.svc.cluster.local:3000",
  },
]
