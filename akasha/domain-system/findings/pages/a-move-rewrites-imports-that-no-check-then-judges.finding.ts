import type { Finding } from "../finding.page-type.ts"

export const aMoveRewritesImportsThatNoCheckThenJudges = {
  id: "01a06437-706c-73f9-ab72-0cda730db8df",
  pageTypeSlug: "finding",
  slug: "a-move-rewrites-imports-that-no-check-then-judges",
  domainSlug: "router-app/temper-web",
  claim:
    "`akasha move` rewrote 11 import lines across 7 files while flattening 56 modules, then reported that a change-mechanical change runs no check and this landing was judged by none. Its dry run had said no file naming what moved needed repointing, which is true only of files outside the moved set and reads as though nothing would be rewritten. A move edits code, its dry run understates what it will edit, and nothing type-checks the result.",
  evidence:
    "Measured 2026-09-02 flattening the companion family to one level below `akasha/temper/temper-web`, commit `06d3314931`.\n\n`git show --numstat -M 06d3314931` reports 114 files changed with 11 insertions and 11 deletions, over 7 files: companion-context, companion-info-panel-card, companion-skill-detail-content (4 lines), companion-stats-context, companion-suggestions-panel-card (2 lines), companion-surplus-panel-card, companion-target-panel-card. Every other file was a pure rename.\n\nBefore the move I counted the imports that would break by grepping for `../../`: three at two levels and two at three, five lines in all. I had planned to hand-repair exactly those five afterwards. The move repaired eleven. Had it not repointed at all, my repair would have left six broken imports, and because the move runs no check nothing would have caught them until something imported the package.\n\nThe repointing was right here. A resolver over every relative specifier in all 78 flat module folders found zero unresolved, and the five checked landings that followed, each importing into the moved modules, were judged by 40 checks apiece with none refusing.\n\nTwo messages make the trap. `no file naming what moved needed repointing` is true of files outside the moved set and is silent about the seven inside it. `a change-mechanical change runs no check, so this landing was judged by none` arrives after the commit rather than before it, so no dry run shows whether the rewrite was right.",
} as const satisfies Finding
