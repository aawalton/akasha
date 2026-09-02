import type { Finding } from "../finding.page-type.ts"

export const aTwinHoldingTheModuleIsNotTheImporterRepointed = {
  id: "01a06345-7ad3-7a0d-b0ac-f2c8bbc00e91",
  pageTypeSlug: "finding",
  slug: "a-twin-holding-the-module-is-not-the-importer-repointed",
  domainSlug: "domain/temper",
  claim:
    "A census that clears an edge because the akasha twin already exports that module under-counts. Finding `4e64eb556d` read the eight `-ui` packages as held by 8 edges where there were 12, setting aside four whose modules the twin already had. It runs one way: a twin holding the module makes an open edge look closed, never the reverse.",
  evidence:
    "Measured at `3253ac18d5`, parsing all 143 tracked `.ts` and `.tsx` files of the eight with the TypeScript AST against a seeded type-only control, and resolving every bare specifier against all 317 tracked manifests with wildcard exports expanded. 12 edges in 7 files land outside `akasha/` and outside the eight, not 8 in 6. The four beyond the earlier list are `@temper/player-completion/completion-card-registry` at `player-completion-skills-morphs-ui/src/skill-morphs-progress-panel-card.tsx:13` and at the same package's `subclassing-skill-morphs-panel-card.tsx:9`, `@temper/player-completion/completion-ui-types` at `skill-morphs-progress-panel-card.tsx:14`, and `@temper/player-completion/completion-percent` at `player-completion-ui/src/completion-panel-card.tsx:13`. Each of those four modules is in the akasha twin, which is why they were passed over, and repointing all twelve took one edit apiece. Comparing exported symbols instead of module names, normalising case and punctuation and reading only the `.module.code.ts` side so no page const can be mistaken for an export, every twin covers its source: `activity-categories` 4 exports against 3, `completion-ui-types` 45 against 45, `build-metadata` 7 against 7, `build-types` 3 against 3. `completion-card-registry` alone is short 3, and all 3 are elsewhere in the same akasha package.",
} as const satisfies Finding
