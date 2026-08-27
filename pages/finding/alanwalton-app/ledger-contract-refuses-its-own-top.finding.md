---
id: 3b458148-de02-57f0-90c9-daac9d13ee78
slug: ledger-contract-refuses-its-own-top
page-type-slug: finding
title: "Ledger contract refuses its own top"
domain-slug: domain/alanwalton-app
---

# Claim

`LedgerContractSchema` — the authoritative cross-boundary contract for `ops abby balance --json` — declares `percentProgress: z.number().min(0).lt(100)`, and the producer it is type-coupled to emits exactly 100 at the L5 clamp. A persona at the top of the ladder fails her own boundary contract. Nothing reports it: the schema's only consumer is a CI-excluded test CI never runs, and `z.ZodType<Ledger>` types the field as `number`, so `tsc` sees no drift.

# Evidence

Read 2026-08-08 at the `~/code` working tree, emptying `dirty/code/packages-alanwalton-personas-docs-levels.md`, whose head paragraph states the true range — "0–100; 100 at the L5 clamp". I read the schema and the function bodies, not the docblocks.

The bound. `packages/alanwalton/personas/core/src/ledger.ts:125-137` is `export const LedgerContractSchema: z.ZodType<Ledger>`, a `.strict()` object; line 134 is `percentProgress: z.number().min(0).lt(100)`. Its docblock at 116-124 calls it the "Authoritative cross-boundary contract for the `ops abby balance --json` stdout", under "Authority: Boundary Parsing".

The value. `computeLedger` at line 164 assigns `percentProgress = percentProgressForGreenDays(greenDayTotal)`. That function, `ladder.ts:236-248`, walks the four `GREEN_BASELINE_DAYS` steps and hits an unconditional `return 100` at line 247 once every step is passed — any total at or above 769 green-days.

Asserted in a wired suite, against the schema. `ledger.unit.test.ts:211-216`, "level clamps at 5 (Bonding); stockpiled points do not overflow", computes at `netBytes: 50_000_000` and asserts `expect(ledger.percentProgress).toBe(100)`.

Not hypothetical. `pages/finding/alanwalton-app/two-bars-summed-into-one-level.finding.md` records `ops persona level aine` returning `percentProgress 100` live on 2026-08-07.

Why nothing catches it. `z.number().min(0).lt(100)` still infers `number`, so the `z.ZodType<Ledger>` coupling is satisfied by the shape and sees nothing of the bound. The docblock names the only consumer: "a CI-excluded `.cli.test.ts`, which CI never runs".

Distinct from `code-quality/abby-balance-help-level-rule-superseded.md` (the `--help` level formula) and `alanwalton-app/two-bars-summed-into-one-level.md` (one persona's inflated total, reading 100 as correct rather than as refused). `rg -uuu -n "LedgerContractSchema"` over `findings/` exits 1.

Not established: whether anything but that CI-excluded test ever parses this schema at runtime. Not repaired — Read-Only Main forbids writing into `~/code`.
