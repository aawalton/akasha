import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { PipelineBranch } from "./properties/pipeline-branch.text-property.ts"
import type { PipelineChangedFiles } from "./properties/pipeline-changed-files.text-property.ts"
import type { PipelineCommit } from "./properties/pipeline-commit.text-property.ts"
import type { PipelineInstructionsCommit } from "./properties/pipeline-instructions-commit.text-property.ts"
import type { PipelineMainPredecessorSeqs } from "./properties/pipeline-main-predecessor-seqs.relation-property.ts"
import type { PipelineName } from "./properties/pipeline-name.text-property.ts"
import type { PipelineNode } from "./properties/pipeline-node.text-property.ts"
import type { PipelineOnlyCheckNames } from "./properties/pipeline-only-check-names.text-property.ts"
import type { PipelineOvertakenBySeq } from "./properties/pipeline-overtaken-by-seq.relation-property.ts"
import type { PipelinePrevPassSkips } from "./properties/pipeline-prev-pass-skips.text-property.ts"
import type { PipelineSeq } from "./properties/pipeline-seq.text-property.ts"
import type { PipelineStatus } from "./properties/pipeline-status.select-property.ts"
import type { PipelineTreeHash } from "./properties/pipeline-tree-hash.text-property.ts"

export type Pipeline = Page & {
  seq: PipelineSeq
  status: PipelineStatus
  name?: PipelineName
  branch?: PipelineBranch
  commit?: PipelineCommit
  instructionsCommit?: PipelineInstructionsCommit
  treeHash?: PipelineTreeHash
  node?: PipelineNode
  changedFiles?: readonly PipelineChangedFiles[]
  onlyCheckNames?: readonly PipelineOnlyCheckNames[]
  prevPassSkips?: readonly PipelinePrevPassSkips[]
  mainPredecessorSeqs?: PipelineMainPredecessorSeqs
  overtakenBySeq?: PipelineOvertakenBySeq
}

export const pipeline = {
  id: "01a06835-e288-7d6f-aaf4-ff2e758872eb",
  pageTypeSlug: "page-type",
  slug: "pipeline",
  definition: "one run of the workflows a commit needs",
  pluralSlug: "pipelines",
  extendsSlug: "page-type/page",
  mortal: true,
  nextSeq: 102,
  partSlugs: [
    "relation-property/pipeline-main-predecessor-seqs",
    "relation-property/pipeline-overtaken-by-seq",
    "select-property/pipeline-status",
    "text-property/pipeline-branch",
    "text-property/pipeline-changed-files",
    "text-property/pipeline-commit",
    "text-property/pipeline-instructions-commit",
    "text-property/pipeline-name",
    "text-property/pipeline-node",
    "text-property/pipeline-only-check-names",
    "text-property/pipeline-prev-pass-skips",
    "text-property/pipeline-seq",
    "text-property/pipeline-tree-hash",
  ],
  properties: [
    { pagePropertySlug: "pipeline-seq", required: true, many: false },
    { pagePropertySlug: "pipeline-status", required: true, many: false },
    { pagePropertySlug: "pipeline-name", required: false, many: false },
    { pagePropertySlug: "pipeline-branch", required: false, many: false },
    { pagePropertySlug: "pipeline-commit", required: false, many: false },
    { pagePropertySlug: "pipeline-instructions-commit", required: false, many: false },
    { pagePropertySlug: "pipeline-tree-hash", required: false, many: false },
    { pagePropertySlug: "pipeline-node", required: false, many: false },
    { pagePropertySlug: "pipeline-changed-files", required: false, many: true, max: null },
    { pagePropertySlug: "pipeline-only-check-names", required: false, many: true, max: null },
    { pagePropertySlug: "pipeline-prev-pass-skips", required: false, many: true, max: null },
    { pagePropertySlug: "pipeline-main-predecessor-seqs", required: false, many: true, max: null },
    { pagePropertySlug: "pipeline-overtaken-by-seq", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A worker reads the settling pages on every tick and takes an event as haste only.",
    },
    {
      invariantKind: "absence",
      statement: "No worker consumes an event log.",
    },
    {
      invariantKind: "departure",
      statement: "A workflow whose watched files reach nothing fails rather than falling back.",
    },
    {
      invariantKind: "departure",
      statement: "A failure lifts only when the same workflow runs again on the same branch.",
    },
    {
      invariantKind: "absence",
      statement: "A newer commit landing behind a failure never lifts that failure.",
    },
    {
      invariantKind: "departure",
      statement: "A step's script is one argument to `sh`.",
    },
    {
      invariantKind: "departure",
      statement: "Kubernetes writes `Error` for a nonzero exit of an unknown cause.",
    },
    {
      invariantKind: "gap",
      statement:
        "A pipeline's definition is fixed by one commit in each repository the pipeline reads.",
    },
    {
      invariantKind: "gap",
      statement: "One writer moves a step page.",
    },
    {
      invariantKind: "gap",
      statement: "The dispatcher and the step never both move the same step page.",
    },
    {
      invariantKind: "gap",
      statement: "What a check builds the main pipeline reuses rather than building it again.",
    },
    {
      invariantKind: "gap",
      statement: "What a check builds is removed once no pipeline will read the build again.",
    },
  ],
} as const satisfies PageType
