import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.types.ts"

export const gitTransportJanitor = {
  id: "01a07c78-54fc-794e-becc-d1343a783c8d",
  pageTypeSlug: "manifest",
  type: "manifest",
  slug: "git-transport-janitor",
  definition: "the cron job clearing push debris out of the repositories the transport serves",
  code: "ts",
  generatedDirectory: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The sweep reaches the repositories through the volume the server writes to.",
    },
    {
      invariantKind: "departure",
      statement: "The sweep runs on the node the repositories sit on.",
    },
    {
      invariantKind: "departure",
      statement: "Debris younger than the stale window is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "A push still writing keeps its own quarantine younger than the stale window.",
    },
    {
      invariantKind: "departure",
      statement: "Every path taken away is named in the job's output.",
    },
  ],
} as const satisfies Manifest
