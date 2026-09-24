import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const clusterFoundation = {
  id: "01a0a5e8-68bd-7b38-afbc-5ac778577610",
  type: "page-type/page-type",
  slug: "cluster-foundation",
  definition: "what a cluster is built on, written here and running as no workload of its own",
  extends: ["page-type/akasha-service"],
  parts: ["cluster-foundation/cluster-foundations", "module/foundation-applying"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A foundation is the namespaces, the roles and the operator configuration a cluster needs first.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A foundation names no image, no replicas and no container port.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A foundation emits no resource carrying a pod template.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A workload a foundation configures is a vendored workload rather than part of the foundation.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A foundation is put up before any service the foundation's namespaces hold.",
    },
    {
      decisionKind: "decision-kind/upkeep",
      statement: "Every manifest no service names is a manifest a foundation names.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  properties: [
    {
      pageProperty: "multi-relation-property/service-manifest",
      required: true,
      many: true,
      maxCount: null,
    },
  ],
} as const satisfies PageType
