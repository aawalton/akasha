import { synthOne } from "akasha/infrastructure/cluster/k8s-types/modules/cdk8s-synth/cdk8s-synth.module.code.ts"

const WEB_PORT = 3000

export function webServiceYaml(
  namespace: string,
  appName: string,
  resourceLabels: Readonly<Record<string, string>>,
  selectorLabels: Readonly<Record<string, string>>
): string {
  return synthOne(namespace, "service", {
    apiVersion: "v1",
    kind: "Service",
    metadata: { name: appName, namespace, labels: resourceLabels },
    spec: {
      type: "ClusterIP",
      selector: selectorLabels,
      ports: [{ port: WEB_PORT, targetPort: WEB_PORT, protocol: "TCP" }],
    },
  })
}
