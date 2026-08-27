interface TunnelRoute {
  name: string
  hostname: string
  service: string
}

export const routes: TunnelRoute[] = [
  {
    name: "s3",
    hostname: "s3.alanwalton.com",
    service: "http://s3-gateway.seaweedfs.svc.cluster.local:8333",
  },
]
