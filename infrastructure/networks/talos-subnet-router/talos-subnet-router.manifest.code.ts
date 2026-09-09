import { synthOne } from "akasha/infrastructure/cluster/k8s-types/cdk8s-synth/cdk8s-synth.module.code.ts"
import {
  NAMESPACE,
  SUBNET_ROUTER_LABELS,
  SUBNET_ROUTER_SELECTOR_LABELS,
  TAILSCALE_IMAGE,
} from "../headscale-constants/headscale-constants.module.code.ts"

function subnetRouterDeploymentYaml(): string {
  return synthOne(NAMESPACE, "subnet-router-deployment", {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: "talos-subnet-router",
      namespace: NAMESPACE,
      labels: SUBNET_ROUTER_LABELS,
    },
    spec: {
      replicas: 1,
      selector: { matchLabels: SUBNET_ROUTER_SELECTOR_LABELS },
      template: {
        metadata: { labels: SUBNET_ROUTER_LABELS },
        spec: {
          terminationGracePeriodSeconds: 30,
          hostAliases: [
            {
              ip: "192.168.68.240",
              hostnames: ["headscale.alanwalton.com"],
            },
          ],
          containers: [
            {
              name: "tailscale",
              image: TAILSCALE_IMAGE,
              env: [
                {
                  name: "TS_AUTHKEY",
                  valueFrom: {
                    secretKeyRef: { name: "subnet-router-auth", key: "TS_AUTHKEY" },
                  },
                },
                {
                  name: "TS_EXTRA_ARGS",
                  value:
                    "--login-server=https://headscale.alanwalton.com --advertise-routes=10.244.0.0/16,10.96.0.0/12 --accept-dns=false",
                },
                { name: "TS_USERSPACE", value: "true" },
                { name: "TS_STATE_DIR", value: "/var/lib/tailscale" },
                { name: "TS_HOSTNAME", value: "talos-subnet-router" },
                { name: "TS_KUBE_SECRET", value: "" },
              ],
              volumeMounts: [
                { name: "state", mountPath: "/var/lib/tailscale" },
                { name: "tmp", mountPath: "/tmp" },
                { name: "run", mountPath: "/run" },
              ],
              resources: {
                requests: { cpu: "50m", memory: "1Gi" },
                limits: { memory: "1Gi" },
              },
              securityContext: {
                runAsUser: 0,
                readOnlyRootFilesystem: true,
                allowPrivilegeEscalation: false,
                capabilities: { drop: ["ALL"] },
              },
            },
          ],
          volumes: [
            { name: "tmp", emptyDir: {} },
            { name: "run", emptyDir: {} },
            { name: "state", emptyDir: {} },
          ],
        },
      },
    },
  })
}

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [{ name: "subnet-router-deployment", yaml: subnetRouterDeploymentYaml() }]
}
