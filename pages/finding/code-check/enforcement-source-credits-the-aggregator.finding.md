---
id: a1316431-afbc-546d-8ed8-3e2891f25f84
page-type-slug: finding
title: "Enforcement source credits the aggregator"
domain-slug: domain/global
---

# Claim

`ops enforcement list` credits all ten checks declared in `check-configs-verification-surface.ts` to `check-configs-source-scanners.ts`, which merely spreads them in. The declaring file appears nowhere in the listing, so a reader following the verb's path to fix an entry lands in a file that does not hold it. The resolver takes the first table file in glob order that names a check, and the aggregator sorts first.

# Evidence

Measured 2026-08-07 in `~/code` at `ecf5f9518`, by running the verb.

THE READING. `ops enforcement list --grep guard-reach` returns one check-step, `check-guard-reach`, sourced to `packages/infra/checks/src/lib/check-configs-source-scanners.ts`. The entry is at `check-configs-verification-surface.ts:157`, with `script: "packages/infra/checks/src/checks/check-guard-reach.ts"` at `:174`. All ten names that file declares — `no-orphan-source`, `cli-json-contract-coupling`, `git-guard-both-forms`, `guarded-resolve`, `env-unset-bash`, `lint-scope-coverage`, `guard-reach`, `predicate-derivation`, `carrier-coverage`, `emitted-path-citations` — read the same way. Over the whole listing, `check-configs-verification-surface.ts` appears 0 times and `check-configs-source-scanners.ts` 38.

THE MECHANISM. `enforcement-sources.ts:215-229`, `declaredChecks`: for every file matching `packages/infra/checks/src/lib/check-configs*.ts`, it walks every exported array and does `if (parsed.success && !declared.has(parsed.data.name)) declared.set(parsed.data.name, file)`. First writer wins, and the order is the glob's. `check-configs-source-scanners.ts:24` imports `VERIFICATION_SURFACE_CHECKS` and spreads it into `SOURCE_SCANNER_CHECKS`, its own header at `:16-18` saying so; `source-scanners` sorts before `verification-surface`, so the aggregator is read first and claims all ten.

THE CONTROL, WHICH SHOWS IT IS ORDER AND NOT AGGREGATION. `check-configs-source-scanners-status-vocabulary.ts` is spread in the same way, from the same file. It sorts BEFORE `check-configs-source-scanners.ts`, and its 2 entries are attributed to it correctly. Nothing distinguishes the two cases but the alphabet.

WHAT IT COSTS. The verb is what settles whether a check is assembled or merely declared — the pair this estate most needs kept apart — and the registration itself is correct: both files' checks assemble and run. Only the attribution is wrong, which is why nothing reds.
