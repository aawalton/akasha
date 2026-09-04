import { synthMulti } from "@akasha/k8s-types/cdk8s-synth"

export const NAMESPACE_NAMES = [
  "alanwalton",
  "archive-of-worlds",
  "audhdalan",
  "collections",
  "connect",
  "design-system",
  "relationships",
  "temper",
  "tracking",
] as const

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
      id: "collections",
      manifest: {
        apiVersion: "v1",
        kind: "Namespace",
        metadata: {
          name: "collections",
          labels: {
            "kubernetes.io/metadata.name": "collections",
          },
        },
      },
    },
    {
      id: "connect",
      manifest: {
        apiVersion: "v1",
        kind: "Namespace",
        metadata: {
          name: "connect",
          labels: {
            "kubernetes.io/metadata.name": "connect",
          },
        },
      },
    },
    {
      id: "design-system",
      manifest: {
        apiVersion: "v1",
        kind: "Namespace",
        metadata: {
          name: "design-system",
          labels: {
            "kubernetes.io/metadata.name": "design-system",
          },
        },
      },
    },
    {
      id: "relationships",
      manifest: {
        apiVersion: "v1",
        kind: "Namespace",
        metadata: {
          name: "relationships",
          labels: {
            "kubernetes.io/metadata.name": "relationships",
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
    {
      id: "tracking",
      manifest: {
        apiVersion: "v1",
        kind: "Namespace",
        metadata: {
          name: "tracking",
          labels: {
            "kubernetes.io/metadata.name": "tracking",
          },
        },
      },
    },
  ])
}

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [{ name: "namespaces", yaml: namespacesYaml() }]
}
