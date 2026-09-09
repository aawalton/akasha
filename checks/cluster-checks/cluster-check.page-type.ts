import type { Module } from "@akasha/code/module"
import type { PageType } from "@akasha/pages/page-type"
import type { Image } from "../../infrastructure/cluster/services/properties/image.text-property.ts"
import type { AlwaysRun } from "./properties/always-run.boolean-property.ts"
import type { ClosurePolicy } from "./properties/closure-policy.text-property.ts"
import type { DispatchNodeTypes } from "./properties/dispatch-node-types.record-property.ts"
import type { Environment } from "./properties/environment.text-property.ts"
import type { Resources } from "./properties/resources.record-property.ts"
import type { TreeSha } from "./properties/tree-sha.boolean-property.ts"

export type ClusterCheck = Module & {
  dispatchNodeTypes?: DispatchNodeTypes
  alwaysRun?: AlwaysRun
  treeSha?: TreeSha
  resources?: Resources
  image?: Image
  environment?: Environment
  closurePolicy?: ClosurePolicy
}

export const clusterCheck = {
  id: "01a0680b-1003-7f61-b2a5-2ea2c327f2e8",
  pageTypeSlug: "page-type",
  slug: "cluster-check",
  definition: "a check too slow to run beside the work, run over the whole tree",
  pluralSlug: "cluster-checks",
  extendsSlug: ["page-type/module"],
  partSlugs: [
    "boolean-property/always-run",
    "boolean-property/tree-sha",
    "record-property/dispatch-node-types",
    "record-property/resources",
    "text-property/closure-policy",
    "text-property/environment",
    "text-property/limit-memory",
    "text-property/node-kind",
    "text-property/request-cpu",
    "text-property/request-memory",
    "text-property/under",
  ],
  properties: [
    {
      pagePropertySlug: "record-property/dispatch-node-types",
      required: false,
      many: true,
      maxCount: null,
    },
    { pagePropertySlug: "boolean-property/always-run", required: false, many: false },
    { pagePropertySlug: "boolean-property/tree-sha", required: false, many: false },
    { pagePropertySlug: "record-property/resources", required: false, many: false },
    { pagePropertySlug: "text-property/image", required: false, many: false },
    { pagePropertySlug: "text-property/environment", required: false, many: false },
    { pagePropertySlug: "text-property/closure-policy", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A cluster check is a module whose code the cluster runs rather than the gate.",
    },
    {
      invariantKind: "departure",
      statement: "A cluster check's code sits beside its page as any module's code does.",
    },
    {
      invariantKind: "departure",
      statement: "A cluster check is woken by the node kinds it names or by every change.",
    },
    {
      invariantKind: "departure",
      statement: "A check the system works out from the packages sits in code rather than here.",
    },
    {
      invariantKind: "departure",
      statement: "A cluster check changes without a deploy.",
    },
    {
      invariantKind: "departure",
      statement:
        "A cluster check states the image the check runs in only where the default will not do.",
    },
    {
      invariantKind: "gap",
      statement: "Every cluster check a person wrote is a page here.",
    },
    {
      invariantKind: "gap",
      statement: "The dispatch a cluster check states wakes that check.",
    },
  ],
} as const satisfies PageType
