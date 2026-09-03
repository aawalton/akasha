interface TunnelRoute {
  name: string
  hostname: string
  service: string
}

export const routes: TunnelRoute[] = [
  {
    name: "temper",
    hostname: "tempereso.com",
    service: "http://web.temper.svc.cluster.local:3000",
  },
  {
    name: "temper-www",
    hostname: "www.tempereso.com",
    service: "http://web.temper.svc.cluster.local:3000",
  },
  {
    name: "temper-dev",
    hostname: "dev.tempereso.com",
    service: "http://web.temper-dev.svc.cluster.local:3000",
  },
]
