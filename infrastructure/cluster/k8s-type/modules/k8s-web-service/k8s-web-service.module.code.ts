import { synthOne } from "akasha/infrastructure/cluster/k8s-type/modules/cdk8s-synth/cdk8s-synth.module.code.ts"

export function webServiceYaml(
  namespace: string,
  appName: string,
  containerPort: number,
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
      ports: [{ port: containerPort, targetPort: containerPort, protocol: "TCP" }],
    },
  })
}
