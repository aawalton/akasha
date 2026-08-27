---
id: 38c63337-b7d8-5799-afd4-7ee19e5a5dcb
slug: docblock-names-a-guard-the-suite-dropped
page-type-slug: finding
title: "Docblock names a guard the suite dropped"
domain-slug: domain/code-quality
---

# Claim

Three docblocks in live tracked source under `packages/alanwalton/chess/src/lib/` state that `stockfishAvailable` and `maiaAvailable` exist "for `skipIf`-guarded tests", and no `skipIf` guard exists in the package — the suites assert availability and fail loud instead, a policy those same suites date to #14306.

# Evidence

Measured 2026-08-08 in `~/code`, while running `ingest-instructions` over `dirty/code/packages-alanwalton-chess-claude.md`.

`rg -n "skipIf" packages/alanwalton/chess/src/` returns three hits, every one a docblock: `engine.ts:42` "True when a usable Stockfish binary is resolvable — for `skipIf`-guarded tests", `engine.ts:65` the same for lc0, `maia.ts:68` the same for lc0-plus-weights. No `skipIf` call site exists in the package.

The three integration suites assert instead. `maia.integration.test.ts:24-25` runs `expect(maiaAvailable(1500)).toBe(true)` and `expect(stockfishAvailable()).toBe(true)`; `loop.integration.test.ts:28` and `position.integration.test.ts:22` carry the same on `stockfishAvailable()`.

The reversal is stated in the suite that made it, `maia.integration.test.ts:12-17`: "Fail-loud, not skip (#14306): ... integration suites are CI-excluded by classification — so there is no CI-green reason to silently skip. A missing binary/weights on the workstation is a provisioning defect the slow-suite gate must surface."

Both functions are live and correctly used; only the purpose stated above them is retired. A seat reading `engine.ts:42` expects an unprovisioned workstation to skip quietly, where it goes red.

What makes it worth recording beyond one stale comment: the quarantined document being ingested carried the same retired claim. A seat cross-checking quarantined prose against the code's own prose gets AGREEMENT and confirms a false claim, both having gone stale at one commit and neither being the executable line. The disagreement shows only against the test bodies.

Searched `~/memory/findings/` first, in its own call. `pages/finding/tests/runtime-skips-count-as-passes.finding.md` is the nearest and is a different claim — runtime skips reported as passes, an instrument gap. Opened rather than judged by name.

Not measured: whether other packages carry the same retired phrasing, or whether any check reports prose naming a guard a file does not use.
