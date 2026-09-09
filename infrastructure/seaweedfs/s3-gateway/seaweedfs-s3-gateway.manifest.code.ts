import { synthOne } from "akasha/infrastructure/cluster/k8s-types/cdk8s-synth/cdk8s-synth.module.code.ts"
import { s3GatewayDeploymentYaml } from "../deployments/seaweedfs-deployments.module.code.ts"
import {
  COMPONENT_S3_GATEWAY,
  componentLabels,
  NAMESPACE,
  S3_GATEWAY_HTTP_PORT,
  selectorLabels,
} from "../seaweedfs-constants/seaweedfs-constants.module.code.ts"

function serviceYaml(): string {
  return synthOne(NAMESPACE, "service-s3-gateway", {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      name: "s3-gateway",
      namespace: NAMESPACE,
      labels: componentLabels(COMPONENT_S3_GATEWAY),
    },
    spec: {
      type: "ClusterIP",
      ports: [
        {
          name: "http",
          port: S3_GATEWAY_HTTP_PORT,
          targetPort: S3_GATEWAY_HTTP_PORT,
        },
      ],
      selector: selectorLabels(COMPONENT_S3_GATEWAY),
    },
  })
}

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "service", yaml: serviceYaml() },
    { name: "s3-gateway", yaml: s3GatewayDeploymentYaml() },
  ]
}
