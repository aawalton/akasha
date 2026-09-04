import { synthOne } from "@akasha/k8s-types/cdk8s-synth"
import {
  COMPONENT_FILER,
  componentLabels,
  FILER_GRPC_PORT,
  FILER_HTTP_PORT,
  METRICS_PORT,
  NAMESPACE,
  selectorLabels,
} from "../seaweedfs-constants/seaweedfs-constants.module.code.ts"
import { filerDeploymentYaml } from "../seaweedfs-deployments/seaweedfs-deployments.module.code.ts"

function serviceYaml(): string {
  return synthOne(NAMESPACE, "service-filer", {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      name: "filer",
      namespace: NAMESPACE,
      labels: componentLabels(COMPONENT_FILER),
    },
    spec: {
      type: "ClusterIP",
      ports: [
        { name: "http", port: FILER_HTTP_PORT, targetPort: FILER_HTTP_PORT },
        { name: "grpc", port: FILER_GRPC_PORT, targetPort: FILER_GRPC_PORT },
        { name: "metrics", port: METRICS_PORT, targetPort: METRICS_PORT },
      ],
      selector: selectorLabels(COMPONENT_FILER),
    },
  })
}

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "service", yaml: serviceYaml() },
    { name: "filer", yaml: filerDeploymentYaml() },
  ]
}
