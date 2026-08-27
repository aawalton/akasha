---
id: 952c0b95-3253-599c-8d76-33233cafd578
page-type-slug: ops-command
title: "Ops tests run"
slug: ops-tests-run
domain-parent-slug: domain/ops-tests
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/tests/run.ts
path: tests run
---

# Definition

- **Ops tests run** — the test suites a caller names, run one process per type and judged on the fail tally.

# Help

Run the test suites you name and report the verdict `classifyRun` gives them — the same policy CI's exit gate applies, on the surface that never had it.

A `.database.test.ts` run through raw `bun test` exits 99 over a fully-green `0 fail` summary: PGlite's WASM Postgres holds a native handle past the last test, and bun reports that as a process failure. This command pins the verdict to the deterministic fail tally instead, so a passing suite reads as a pass.

The forgiveness is one-way. A genuinely failing suite exits 1 with a positive fail tally and is still reported FAIL; a signal death that printed no summary is UNKNOWN, never a pass.

One `bun test` process per test type. A directory holds every type at once, and `mock.module` is process-global in bun, so a `unit` suite's stub of a module reaches a `smoke` suite that imports it — and the package's verdict becomes a function of which files shared a process rather than of the code. Nothing is filtered out to achieve that: every named suite still runs, in a process shared only with suites of its own type. A failure in any one of them is the run's failure, and the verdict names which type produced it.

Suites run from the current directory, so the paths are whatever you would have passed to `bun test`. An argument naming no path is a bun filter, which cannot be expanded here and is run as given. bun's own output goes to stderr; stdout carries the one verdict line.

Exit codes:
  0  pass — green summary, whatever bun's exit code was
  1  fail — a positive fail tally, or a non-zero exit with no summary
  2  a signal death that produced no summary. The claim line reads FAIL for this as it does for code 1 — a gate that could not observe has verified nothing, and a third word beside a pass is how an unobserved run gets read as a clean one. Read the exit code, and `evidence[].runVerdict` in a payload, to know which it was
