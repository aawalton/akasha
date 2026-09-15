import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const clusterFoundation = {
  id: "01a0a5e8-68bd-7b38-afbc-5ac778577610",
  type: "page-type/page-type",
  slug: "cluster-foundation",
  definition: "what a cluster is built on, written here and running as no workload of its own",
  extends: ["page-type/service"],
  parts: ["cluster-foundation/cluster-foundations"],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A foundation is the namespaces, the roles and the operator configuration a cluster needs first.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A foundation names no image, no replicas and no container port.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A foundation emits no resource carrying a pod template.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A workload a foundation configures is a vendored workload rather than part of the foundation.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A foundation is put up before any service the foundation's namespaces hold.",
    },
    {
      invariantKind: "invariant-kind/upkeep",
      statement: "Every manifest no service names is a manifest a foundation names.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  properties: [
    {
      pageProperty: "relation-property/service-manifest",
      required: true,
      many: true,
      maxCount: null,
    },
  ],
} as const satisfies PageType
