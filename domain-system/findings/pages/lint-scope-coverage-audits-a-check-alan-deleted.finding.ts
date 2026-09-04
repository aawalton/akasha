import type { Finding } from "../finding.page-type.ts"

export const lintScopeCoverageAuditsACheckAlanDeleted = {
  id: "01a05ce0-2436-7003-986c-b3741241dee5",
  pageTypeSlug: "finding",
  slug: "lint-scope-coverage-audits-a-check-alan-deleted",
  domainSlug: "workspace-package/checks",
  claim:
    "lint-scope-coverage weighs biome's declared lint scope against the dispatch seeds of a cluster check Alan deleted, and its replacement declares no dispatch seeds at all, so there is nothing left to point the audit at and no repair preserves its verdict.",
  evidence:
    "`lintSeeds` at `tools/audits/lint-scope-coverage.ts:103-111` looks for a config named `lint` in `STATIC_CHECKS` and throws where it finds none. It finds none. Alan removed that entry at `169ed1a66f`, whose message says the lint cluster check goes and the new lint-clean replaced it, and whose diff takes the whole block out of `tools/lib/check-workflow/check-configs.ts` including its `dispatchNodeTypes` of TS_POPULATION plus js-file, jsx-file and json-file. The same message says biome-lint-scope.ts stays because this audit imports it and run-checks still runs it, so the audit outliving its subject was seen rather than overlooked, but the throw at `:105` was not. The replacement carries nothing to repoint to. `akasha/checks-system/code-check/lint-clean/lint-clean.code-check.ts` states `runsOnPatch: true` and `runsOnAudit: true` and no seeds; the code-check page type at `akasha/checks-system/code-check/code-check.page-type.ts` declares only the four phase properties. `dispatchNodeTypes` survives solely in the cluster workflow machinery under `infra/cluster-checks/src/lib/`. Under lint-clean audit is handed every file, so the gap this audit measures cannot exist by construction and any repointing would make it pass over everything rather than answer its question. Whether the audit should be rewritten to ask a new question, or should go, decides what it refuses.",
} as const satisfies Finding
