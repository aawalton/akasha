import type { Module } from "@akasha/code-system/module"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Image } from "@akasha/service-system/image"
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
  extendsSlug: "page-type/module",
  partSlugs: [
    "boolean-property/always-run",
    "boolean-property/tree-sha",
    "cluster-check/acyclic-packages",
    "cluster-check/addon-build",
    "cluster-check/app-capacitor-parity",
    "cluster-check/app-intent-brand-words",
    "cluster-check/ast-grep",
    "cluster-check/bin-mode",
    "cluster-check/checksum-annotation-substitution",
    "cluster-check/cli-json-contract-coupling",
    "cluster-check/client-env-inlined",
    "cluster-check/client-page-access-boundary",
    "cluster-check/codegen-type-identity-drift",
    "cluster-check/color-literals",
    "cluster-check/dep-versions",
    "cluster-check/design-tokens",
    "cluster-check/env-unset-bash",
    "cluster-check/eso-global-decl-consistency",
    "cluster-check/eso-live-dir-candidate-order",
    "cluster-check/functional-type",
    "cluster-check/generated-suffix",
    "cluster-check/git-guard-both-forms",
    "cluster-check/guarded-resolve",
    "cluster-check/health-samples-stream",
    "cluster-check/healthkit-read-only",
    "cluster-check/held-addon-structure",
    "cluster-check/image-tags",
    "cluster-check/instruction-references",
    "cluster-check/k8s-node-selector",
    "cluster-check/layer-monotonicity",
    "cluster-check/lib-sets-stale-capture",
    "cluster-check/memory-qos",
    "cluster-check/mock-module-leak",
    "cluster-check/mock-module-surface",
    "cluster-check/no-hardcoded-surface",
    "cluster-check/no-orphan-source",
    "cluster-check/package-names",
    "cluster-check/phantom-deps",
    "cluster-check/playwright-image-alignment",
    "cluster-check/porcelain-status-boundary",
    "cluster-check/properties-file-key-space",
    "cluster-check/prose-mechanism-restatement",
    "cluster-check/repo-paths",
    "cluster-check/rr-server-module-in-client",
    "cluster-check/service-dockerfiles-gitignored",
    "cluster-check/shellcheck",
    "cluster-check/sops-manifests",
    "cluster-check/spacing-scale",
    "cluster-check/start-script",
    "cluster-check/syntax-bundle",
    "cluster-check/tailwind-sources",
    "cluster-check/temper-type-tier-monotonicity",
    "cluster-check/test-step-paths",
    "cluster-check/tsconfig",
    "cluster-check/tstl-this-void-self-drop",
    "cluster-check/unused-deps",
    "cluster-check/verdict-emitter-chokepoint",
    "cluster-check/vite-supabase-rr-define",
    "cluster-check/widget-payload-shape-mirror",
    "cluster-check/workspaces-mainseam",
    "cluster-check/yaml-usage",
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
    { pagePropertySlug: "dispatch-node-types", required: false, many: true, max: null },
    { pagePropertySlug: "always-run", required: false, many: false },
    { pagePropertySlug: "tree-sha", required: false, many: false },
    { pagePropertySlug: "resources", required: false, many: false },
    { pagePropertySlug: "image", required: false, many: false },
    { pagePropertySlug: "environment", required: false, many: false },
    { pagePropertySlug: "closure-policy", required: false, many: false },
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
      statement: "A check the system works out from the packages stands in code rather than here.",
    },
    {
      invariantKind: "departure",
      statement: "A cluster check changes without a deploy.",
    },
    {
      invariantKind: "departure",
      statement: "A cluster check states the image it runs in only where the default will not do.",
    },
    {
      invariantKind: "gap",
      statement: "Every cluster check a person wrote stands as a page here.",
    },
    {
      invariantKind: "gap",
      statement: "The dispatch a cluster check states is what wakes that check.",
    },
  ],
  directives: [
    {
      directiveKind: "rule",
      name: "Counted Or Held",
      act: "State a least count for a check's subject and what it rests on, or hold the check.",
      warrant:
        "A subject that empties reads exactly like a clean repo, and nothing reports the difference.",
      aids: [
        "What it rests on, a later hand must keep true.",
        "A check cannot see what it should have matched.",
      ],
    },
  ],
} as const satisfies PageType
