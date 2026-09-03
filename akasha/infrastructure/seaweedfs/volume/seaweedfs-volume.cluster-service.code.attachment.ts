import { synthOne } from "@akasha/k8s-types/cdk8s-synth"
import {
  COMPONENT_VOLUME,
  componentLabels,
  METRICS_PORT,
  NAMESPACE,
  selectorLabels,
  VOLUME_GRPC_PORT,
  VOLUME_HTTP_PORT,
} from "../seaweedfs-constants/seaweedfs-constants.module.code.ts"
import { volumeDeploymentYaml } from "../seaweedfs-deployments/seaweedfs-deployments.module.code.ts"

function serviceYaml(): string {
  return synthOne(NAMESPACE, "service-volume", {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      name: "volume",
      namespace: NAMESPACE,
      labels: componentLabels(COMPONENT_VOLUME),
    },
    spec: {
      type: "ClusterIP",
      ports: [
        { name: "http", port: VOLUME_HTTP_PORT, targetPort: VOLUME_HTTP_PORT },
        { name: "grpc", port: VOLUME_GRPC_PORT, targetPort: VOLUME_GRPC_PORT },
        { name: "metrics", port: METRICS_PORT, targetPort: METRICS_PORT },
      ],
      selector: selectorLabels(COMPONENT_VOLUME),
    },
  })
}

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "service", yaml: serviceYaml() },
    { name: "volume", yaml: volumeDeploymentYaml() },
  ]
}
