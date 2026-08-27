---
id: cf2b6c2f-306f-5760-8961-a129756cb58b
page-type-slug: finding
title: "Fizz exits zero on failure"
domain-slug: domain/global
---

# Claim

The `fizz` binary exits 0 on a spec whose model check FAILED, so an exit status is not a verdict on a FizzBee spec.

# Evidence

Found on 2026-08-16 while #19288 stripped comments from 71 FizzBee specs and needed a proof that the specs still meant what they had.

The delivering seat negated one invariant in a real stripped spec, `packages/infra/ci/worker/spec/monotonicity.fizz`, copied out to scratch. `fizz` printed `FAILED: Model checker failed` and then exited **0** — the same status a passing run gives. Any caller reading the exit status alone would record every broken spec as proved.

The verdicts for #19288 were therefore read from the literal `PASSED: Model checker completed successfully` line rather than from the exit code, over all 71 specs, before and after the strip.

Nothing in the repository is currently fooled by this. `runFizz` in `packages/infra/spec/cli/src/lib/fizz-runner.ts` parses stdout for `FAILED:` lines first and only consults `exitCode` afterwards, returning `errored` rather than `passed`; `ops spec check` and `check-spec-bundle` both go through it. So this is a live trap for the next caller written rather than a present defect.

The domain's own Design already says the binary being absent must fail a run rather than report a pass. This is the same hazard one layer in: the binary is present, answers, and reports success while saying it failed.
