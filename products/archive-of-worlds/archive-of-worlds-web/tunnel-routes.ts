interface TunnelRoute {
  name: string
  hostname: string
  service: string
}

export const routes: TunnelRoute[] = [
  {
    name: "archive-of-worlds",
    hostname: "archiveofworlds.app",
    service: "http://web.archive-of-worlds.svc.cluster.local:3000",
  },
]
