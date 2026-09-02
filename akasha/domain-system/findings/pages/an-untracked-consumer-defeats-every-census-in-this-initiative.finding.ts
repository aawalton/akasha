import type { Finding } from "../finding.page-type.ts"

export const anUntrackedConsumerDefeatsEveryCensusInThisInitiative = {
  id: "01a06287-4fd0-7aba-9424-de82f1958bac",
  pageTypeSlug: "finding",
  slug: "an-untracked-consumer-defeats-every-census-in-this-initiative",
  domainSlug: "domain/temper",
  claim:
    "Eight files under tools/cand import tools/lib/temper-addon-data/pages-bridge.ts, and git ls-files tools/cand/ answers zero. Every census this migration runs enumerates from the tracked list, so no tracked-file count, no typecheck of the tracked tree and no dangling-import sweep reports the break when that module moves. One untracked consumer is invisible to all of them at once.",
  evidence:
    'Measured 2026-09-02 at commit 36acbb0601.\n\n`ls tools/cand/` shows 19 files on disk. `git ls-files tools/cand/` answers 0. Eight of the 19 carry `import { getPages } from "../lib/temper-addon-data/pages-bridge.ts"`: check-companion-skill.ts, check-diffs.ts, check-metric-tree.ts, check-motif-style.ts, check-repoints.ts, check-rule-template.ts, check-scribing-sources.ts and check-skill-activation.ts. Two of the eight, check-diffs.ts and check-repoints.ts, also take `withSidecars` from `catalog-sidecars.ts` beside it.\n\nThe population is bounded rather than sampled. `git ls-files --others --exclude-standard` over `tools/`, `akasha/` and `temper/`, dropping node_modules, answers 19 TypeScript files for the whole tree, and all 19 are these. So eight of the tree\'s nineteen untracked TypeScript files reach into the first folder this migration moves, and eleven do not.\n\nWhat this bears on is every instrument here that begins from `git ls-files`: the tracked-file counts each seat publishes, the tree-wide typecheck harness, and the dangling side-effect-import census. A side-effect import is already the one import TypeScript never resolves. An untracked importer is worse, because even a named binding is never compiled. Both answer exit 0 with no diagnostic, and a blind run and a clean run are the same string.\n\nNothing here argues the eight ought to be tracked. Moving `pages-bridge.ts` breaks them with no instrument reporting it, so the loss is known only where it is written down before the move.',
} as const satisfies Finding
