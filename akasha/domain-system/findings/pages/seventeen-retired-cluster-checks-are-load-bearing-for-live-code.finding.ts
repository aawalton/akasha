import type { Finding } from "../finding.page-type.ts"

export const seventeenRetiredClusterChecksAreLoadBearingForLiveCode = {
  id: "01a06130-bb88-777d-a21d-97c0ab0f3b7e",
  pageTypeSlug: "finding",
  slug: "seventeen-retired-cluster-checks-are-load-bearing-for-live-code",
  domainSlug: "domain/akasha-migration",
  claim:
    "Seventeen retired cluster checks are load-bearing for live code. `scanner-registry.ts` imports sixteen for their scanner exports, and `package-add/derive.ts` imports `expectedPackageName` from `check-package-names.ts`, so `ops audit rule-population` and `ops package add` run on them. Their own refusal says a result from one of them means nothing; a live audit reads their scanners anyway.",
  evidence:
    "Measured on 2026-09-02, while fixing the import-time `process.exit(2)` in `infra/cluster-checks/src/lib/retired.ts` (commit `8c4058e83f`).\n\nOf the 79 files that import that module, 17 are themselves imported by other modules for their named exports. `infra/cluster-checks/src/lib/scanner-registry.ts` lines 1 to 19 pull scanner entries out of sixteen check files; `infra/workspace-cli/src/lib/package-add/derive.ts:2` pulls `expectedPackageName` out of `check-package-names.ts`. `scanner-registry.ts` is what supplies `SYNTAX_SCANNER_ENTRIES` to `infra/cluster-checks/src/audits/rule-population.ts`, which is what `ops audit rule-population` runs — that command's own help says it reaches the syntax scanners.\n\nAll 17 already carried an `import.meta.main` guard around their check logic before tonight, so they were written as both library and entry point from the start. The retirement commit `97b4f9e566` treated all 79 uniformly as entry points and gave them an unconditional import-time exit, which is what killed both live commands, and through `commandSurface()` killed four audits that had therefore never once produced a verdict.\n\nThe call taken: I moved when the refusal fires and left the coupling exactly as it is. Cutting these scanners out of the live audit, or rewriting them under `akasha/checks/code-checks/pages/` as `retired.ts` instructs, changes what `ops audit rule-population` measures. Whether those populations are worth keeping is a judgement about the migration rather than about the crash I was sent to fix.",
} as const satisfies Finding
