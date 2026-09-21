interface TunnelRoute {
  name: string
  hostname: string
  service: string
}

export const routes: TunnelRoute[] = [
  {
    name: "requests",
    hostname: "requests.alanwalton.com",
    service: "http://requests.alanwalton.svc.cluster.local:3000",
  },
]
