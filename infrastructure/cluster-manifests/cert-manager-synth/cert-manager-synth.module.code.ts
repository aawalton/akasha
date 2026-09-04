import { synthOne } from "@akasha/k8s-types/cdk8s-synth"

const NAMESPACE_ID = "cert-manager"

const CLUSTER_ISSUER_LABELS = {
  "app.kubernetes.io/name": "cert-manager",
  "app.kubernetes.io/instance": "letsencrypt-prod",
  "app.kubernetes.io/component": "cluster-issuer",
  "app.kubernetes.io/part-of": "cert-manager",
  "app.kubernetes.io/managed-by": "deploy-script",
} as const

function clusterIssuerYaml(): string {
  return synthOne(NAMESPACE_ID, "cluster-issuer", {
    apiVersion: "cert-manager.io/v1",
    kind: "ClusterIssuer",
    metadata: {
      name: "letsencrypt-prod",
      labels: CLUSTER_ISSUER_LABELS,
    },
    spec: {
      acme: {
        server: "https://acme-v02.api.letsencrypt.org/directory",
        email: "alan@audhdalan.com",
        privateKeySecretRef: { name: "letsencrypt-prod-account-key" },
        solvers: [
          {
            dns01: {
              cloudflare: {
                apiTokenSecretRef: {
                  name: "cloudflare-api-token",
                  key: "api-token",
                },
              },
            },
            selector: {
              dnsZones: ["alanwalton.com"],
            },
          },
        ],
      },
    },
  })
}

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [{ name: "cluster-issuer", yaml: clusterIssuerYaml() }]
}
