interface TunnelRoute {
  name: string
  hostname: string
  service: string
}

export const routes: TunnelRoute[] = [
  {
    name: "alanwalton",
    hostname: "alanwalton.com",
    service: "http://web.alanwalton.svc.cluster.local:3000",
  },
  {
    name: "alanwalton-webhook",
    hostname: "webhook.alanwalton.com",
    service: "http://web.alanwalton.svc.cluster.local:3000",
  },
  {
    name: "alanwalton-sms",
    hostname: "sms.alanwalton.com",
    service: "http://web.alanwalton.svc.cluster.local:3000",
  },
  {
    name: "alanwalton-idle-legacy",
    hostname: "idle.alanwalton.com",
    service: "http://web.alanwalton.svc.cluster.local:3000",
  },
]
