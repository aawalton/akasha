import type { Finding } from "../finding.page-type.ts"

export const theLocalCheckDriverSpawnsAnUnexpandedShellVariable = {
  id: "01a05cc3-f730-772b-bdf7-37427fa7332b",
  pageTypeSlug: "finding",
  slug: "the-local-check-driver-spawns-an-unexpanded-shell-variable",
  domainSlug: "domain/akasha-check",
  claim:
    "`routedCheckArgv` hands back an argv array whose first element is the literal text `$AKASHA_ROOT/...`. Only a shell expands that, and the one caller that spawns it passes the array straight to `Bun.spawnSync`, which does not. Both checks the local driver routes die at module resolution having judged nothing, and are recorded as failing the thing they were meant to judge.",
  evidence:
    '`tools/lib/check-workflow/run-check-routing.ts` sets `RUN_CHECK_INVOCATION = `$AKASHA_ROOT/${RUN_CHECK_PATH}`` and `routedCheckArgv` returns `["bun", RUN_CHECK_INVOCATION, script, ...args]`. That shape suits `routedCheckCommand`, which joins it into a shell string. `infra/cluster-checks/src/ci-check-local.ts` instead spreads it into `Bun.spawnSync` at line 27 for `check-shellcheck.ts` and line 65 for `check-dep-versions.ts`. Spawn does no variable expansion, so both get `error: Module not found "$AKASHA_ROOT/infra/cluster-checks/src/run-check.ts"` and exit 1. I reproduced this directly with `AKASHA_ROOT` exported and correctly set in the environment, which makes no difference. `localStatusForCheckExit` in `infra/cluster-checks/src/lib/local-check-verdict.ts:6-10` maps exit 1 to `fail`, not `skip`, so the driver reports a shellcheck failure and a dep-versions failure that no shell script and no manifest caused. This is loud rather than silent, so it is a wrong verdict rather than an unrun check, but the two are indistinguishable to whoever reads the result. The fix is for the one caller to spawn a resolved absolute path, or for `routedCheckArgv` to resolve `AKASHA_ROOT` itself rather than hand back text only a shell can finish.',
} as const satisfies Finding
