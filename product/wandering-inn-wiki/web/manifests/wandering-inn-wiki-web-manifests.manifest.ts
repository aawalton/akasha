import type { Manifest } from "akasha/infrastructure/cluster/k8s-type/manifest/manifest.page-type.types.ts"

export const wanderingInnWikiWebManifests = {
  id: "01a0c5ec-1abc-79c2-a38d-b2db427f7588",
  type: "page-type/manifest",
  slug: "wandering-inn-wiki-web-manifests",
  definition: "the namespace, deployment and service drawing innworld.wiki",
  code: "ts",
  generatedDirectory: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The namespace is opened here rather than by hand before the first deploy.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The pod template carries the hash of no secret.",
    },
  ],
} as const satisfies Manifest
