import type { SeqSource } from "@akasha/markdown-pages/page-seq"
import { pageTypePathIn } from "@akasha/markdown-pages/page-types"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"

const pageTypeAt = (slug: string): string => pageTypePathIn(rootFor(resolveRoots(), AKASHA), slug)

export const PIPELINE_SEQS: SeqSource = {
  pageTypeRelPath: pageTypeAt("pipeline"),
  noun: "pipeline",
}

export const WORKFLOW_SEQS: SeqSource = {
  pageTypeRelPath: pageTypeAt("workflow"),
  noun: "workflow",
}

export const STEP_SEQS: SeqSource = { pageTypeRelPath: pageTypeAt("step"), noun: "step" }
