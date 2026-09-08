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
    "cluster-check/checksum-annotation-substitution",
    "cluster-check/syntax-bundle",
    "module/audit-reading",
    "module/blank-comments",
    "module/checksum-annotation-pairing",
    "module/checksum-annotation-substitution",
    "module/checksum-substitution-reachability",
    "module/cluster-population-bound",
    "module/file-finding",
    "module/population",
    "module/remediation-doc",
    "module/test-step-loading",
    "module/violation-reporting",
    "module/workspace-deps",
    "record-property/dispatch-node-types",
    "record-property/resources",
    "text-property/closure-policy",
    "text-property/environment",
    "text-property/limit-memory",
    "text-property/node-kind",
    "text-property/request-cpu",
    "text-property/request-memory",
    "text-property/under",
    "module/retired",
    "module/ts-object-literal-self",
    "module/check-object-literal-self",
    "module/scanner-registry",
    "module/lua-compiler-sources",
    "module/ts-property-callback-self",
    "module/check-property-callback-self",
    "module/addon-build-population",
    "module/alanwalton-ios-seam",
    "module/change-closure",
    "module/check-component-layout",
    "module/check-exhaustive-dispatch",
    "module/check-harness-credential-script-text",
    "module/check-libc-ffi-binding",
    "module/check-no-void-return",
    "module/check-phantom-deps-filters",
    "module/check-phantom-deps-json-contract",
    "module/check-popover-viewport-safety",
    "module/check-population-read-swallow",
    "module/check-sops-spawn-pipe",
    "module/check-suspense-throw-settles",
    "module/check-timezone-handling",
    "module/check-type-assertions",
    "module/component-layout-boundary",
    "module/component-slot-detection",
    "module/component-sources",
    "module/head-styles-violations",
    "module/image-tag-rule",
    "module/jsx-class-tokens",
    "module/jsx-class-tokens-roots",
    "module/jsx-class-tokens-values",
    "module/jsx-surface-tokens",
    "module/layer-monotonicity",
    "module/libc-ffi-binding",
    "module/non-test-population",
    "module/popover-family-wrappers",
    "module/process-start",
    "module/repo-files",
    "module/repo-path-resolver",
    "module/repo-scope",
    "module/rule-population",
    "module/rule-population-audit",
    "module/sops-manifest",
    "module/suppression-subject",
    "module/surface-literal-sites",
    "module/swift-masked-source",
    "module/syntax-scanner-entry",
    "module/temper-type-tier",
    "module/test-classification",
    "module/tree-globs",
    "module/ts-exhaustive-dispatch",
    "module/ts-file-iteration",
    "module/ts-harness-credential-script-text",
    "module/ts-import-graph-list-imports",
    "module/ts-path-literals",
    "module/ts-population-read-swallow",
    "module/ts-sops-spawn-pipe",
    "module/ts-suspense-throw",
    "module/ts-timezone-violations",
    "module/ts-type-assertions",
    "module/ts-void-declarations",
    "module/walk-package-tree",
    "module/yaml-usage",
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
