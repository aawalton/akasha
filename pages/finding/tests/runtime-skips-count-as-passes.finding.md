---
id: 82ddc181-3039-58ee-bfb4-29a7bdfa0e14
slug: runtime-skips-count-as-passes
page-type-slug: finding
title: "Runtime skips count as passes"
domain-slug: domain/global
---

# Claim

A suite whose tests skip at runtime reports the skips as passes, so a file where ten of
eleven tests never execute prints `11 pass, 0 fail`, and no check in the akasha tree
reports the difference.

# Evidence

Measured 2026-08-04 while running `define-principle-or-rule` against a candidate about
test-first development. The incident is secondhand — recorded at
`~/instructions/dirty/skills/ci/findings.md:1138` by `project-16897` on 2026-07-28 — and
the instrument gap around it is firsthand.

The recorded incident: `schema-validation.database.test.ts` reports `11 pass, 0 fail`
while ten of its eleven tests skip at runtime, because `pg_jsonschema` is unavailable
under pglite. One `expect()` runs. That file is the estate's only automated coverage of
`_enforce_page_schema`, the write-boundary guard standing in front of 28 live property
schemas across 7 page types, so the guard's coverage reads as full and is one assertion.

Firsthand, 2026-08-04: `packages/infra/checks/src/checks/` holds 186 checks and none
reports runtime skips. The three whose names reach tests are `check-test-classification`,
`check-test-step-paths` and `check-unit-test-io-hermeticity`; none counts what executed.
`check-non-optimistic-mutations` is about optimistic UI writes and `check-type-assertions`
about `as` casts, so neither is a vacuity instrument despite the names.

This is the subclass of the vacuous-pass family that an instrument can refuse rather than
a reader having to notice: the skip count is a number the runner already has. The wider
family is not mechanically refusable — a suite that executes every test and asserts
nothing that can fail leaves no count behind.

Not measured: how many suites in the tree currently skip at runtime, no instrument
reporting it; whether `bun test` exposes the skip count in a form a check could read;
whether the pglite gap at the incident above still stands. Whether the guard has since
gained other coverage was not checked.
