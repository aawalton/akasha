import type { PageType } from "@akasha/pages/page-type"
import type { Host } from "../hosts/host.page-type.ts"

export type Cluster = Host

export const cluster = {
  id: "01a06835-e289-7833-a83f-42355181b6da",
  pageTypeSlug: "page-type",
  slug: "cluster",
  definition: "the machines in Alan's home lab",
  pluralSlug: "clusters",
  partSlugs: ["cluster/main"],
  extendsSlug: ["page-type/host"],
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
        "The work a person did on one of those machines under Windows, that person can still do.",
    },
    {
      invariantKind: "gap",
      statement: "Work stops on a machine the moment a person starts using that machine.",
    },
  ],
} as const satisfies PageType
