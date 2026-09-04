import type { Domain } from "@akasha/domains/domain"
import type { PageType } from "@akasha/pages-system/page-type"
import type { AuditRuns } from "./properties/audit-runs.number-property.ts"
import type { ModelTestSlugs } from "./properties/model-test-slugs.relation-property.ts"
import type { PatchRuns } from "./properties/patch-runs.number-property.ts"

export type ModelCheck = Domain & {
  modelTestSlugs: ModelTestSlugs
  patchRuns: PatchRuns
  auditRuns: AuditRuns
}

export const modelCheck = {
  id: "01a05911-aa15-776e-9726-ed4131cd6b51",
  pageTypeSlug: "page-type",
  slug: "model-check",
  definition: "a check judging a change by putting prompts to a model",
  pluralSlug: "model-checks",
  partSlugs: [
    "model-check/invariant-earns-its-place",
    "number-property/audit-runs",
    "number-property/patch-runs",
    "relation-property/model-test-slugs",
  ],
  extendsSlug: ["page-type/domain"],
  properties: [
    { pagePropertySlug: "model-test-slugs", required: true, many: true, max: null },
    { pagePropertySlug: "patch-runs", required: true, many: false },
    { pagePropertySlug: "audit-runs", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One positive among the runs is a positive.",
    },
    {
      invariantKind: "departure",
      statement: "Two runs of one prompt over one input answer differently.",
    },
    {
      invariantKind: "departure",
      statement: "A count of no runs is a check that stands and does not run.",
    },
    {
      invariantKind: "departure",
      statement: "An audit is asked for a count rather than given a count.",
    },
    {
      invariantKind: "departure",
      statement:
        "A model check spends a call for each run over each thing whose answer is still `no`.",
    },
    {
      invariantKind: "departure",
      statement:
        "A refusal says a positive the writer does not think true is brought to Alan rather than argued with.",
    },
    {
      invariantKind: "departure",
      statement: "Which pages a test judges is stated in its code rather than in its prompt.",
    },
    {
      invariantKind: "departure",
      statement: "A check refuses only where a model answered the check.",
    },
    {
      invariantKind: "absence",
      statement: "A model check states no phase.",
    },
  ],
} as const satisfies PageType
