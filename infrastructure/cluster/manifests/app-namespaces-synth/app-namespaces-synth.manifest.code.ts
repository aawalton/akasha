import { synthMulti } from "akasha/infrastructure/cluster/k8s-types/cdk8s-synth/cdk8s-synth.module.code.ts"

export const NAMESPACE_NAMES = ["alanwalton", "archive-of-worlds", "audhdalan", "temper"] as const

function namespacesYaml(): string {
  return synthMulti("app-namespaces", [
    {
      id: "alanwalton",
      manifest: {
        apiVersion: "v1",
        kind: "Namespace",
        metadata: {
          name: "alanwalton",
          labels: {
            "kubernetes.io/metadata.name": "alanwalton",
          },
        },
      },
    },
    {
      id: "archive-of-worlds",
      manifest: {
        apiVersion: "v1",
        kind: "Namespace",
        metadata: {
          name: "archive-of-worlds",
          labels: {
            "kubernetes.io/metadata.name": "archive-of-worlds",
          },
        },
      },
    },
    {
      id: "audhdalan",
      manifest: {
        apiVersion: "v1",
        kind: "Namespace",
        metadata: {
          name: "audhdalan",
          labels: {
            "kubernetes.io/metadata.name": "audhdalan",
          },
        },
      },
    },
    {
      id: "temper",
      manifest: {
        apiVersion: "v1",
        kind: "Namespace",
        metadata: {
          name: "temper",
          labels: {
            "kubernetes.io/metadata.name": "temper",
          },
        },
      },
    },
  ])
}

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [{ name: "namespaces", yaml: namespacesYaml() }]
}
