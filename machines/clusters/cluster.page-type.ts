import type { PageType } from "@akasha/pages/page-type"

export const cluster = {
  id: "01a06835-e289-7833-a83f-42355181b6da",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "cluster",
  definition: "the machines in Alan's home lab",
  pluralSlug: "clusters",
  parts: ["cluster/main", "text-property/talos-secrets"],
  extends: ["page-type/host"],
  properties: [
    { pageProperty: "text-property/talos-secrets", required: false, many: false, secret: true },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A workload names the class of node the workload runs on.",
    },
    {
      invariantKind: "gap",
      statement:
        "A workload reaches a node by the needs that workload states rather than by a class node carries.",
    },
    {
      invariantKind: "gap",
      statement: "The machines people use day to day run Linux and are nodes in the cluster.",
    },
    {
      invariantKind: "gap",
      statement:
        "The work a person did on a cluster machine under Windows is work that person can still do.",
    },
    {
      invariantKind: "gap",
      statement: "Work stops on a machine the moment a person starts using that machine.",
    },
  ],
  types: "ts",
} as const satisfies PageType
