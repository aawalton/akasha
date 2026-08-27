interface TunnelRoute {
  name: string
  hostname: string
  service: string
}

export const routes: TunnelRoute[] = [
  {
    name: "smilingjenny",
    hostname: "smilingjenny.me",
    service: "http://web.smilingjenny.svc.cluster.local:3000",
  },
]
