---
id: a3cd1897-8091-5951-a4b1-8b8e5e9b0f28
page-type-slug: finding
title: "Runner misses the missing entrypoint framing"
domain-slug: domain/global
---

# Claim

`run-check.ts` reports a violation of the branch for a check that never ran, when the check's own entrypoint is missing. Its tool-error predicate is `/^error: Cannot find module /m`, Bun's framing for an import failure INSIDE a check; a missing entrypoint is framed `error: Module not found "<path>"` and is not matched, so exit 1 passes through as violations. The predicate's own criterion — Bun's own message, written before any check code runs — admits the unmatched framing equally.

# Evidence

REPRODUCED AT ~/code HEAD `47a2a573e4`:

    $ bun packages/infra/checks/src/run-check.ts packages/infra/checks/src/checks/check-does-not-exist.ts
    error: Module not found "packages/infra/checks/src/checks/check-does-not-exist.ts"
    EXIT=1

No `[run-check]` line, so nothing classified it. The runner exists to turn this into exit 2.

THE PREDICATE. `packages/infra/checks/src/lib/run-check-core.ts:32` is `const MODULE_RESOLUTION = /^error: Cannot find module /m`, with the reason at `:29-31`: "Anchored to a line start because the message is Bun's own, written before any check code runs — a check that forwards a subprocess's complaint has prefixed it."

THE NARROWNESS IS DELIBERATE, AND STATED TWICE. `:34-40`: "The predicate is narrow on purpose. Bun frames a check's own uncaught throw (`error: boom`) and its own syntax diagnostics the same way … A missed tool error costs a confusing red; a downgraded violation costs a real finding." `run-check-core.unit.test.ts:54-56` restates it and pins it with a syntax error and a mid-run throw staying violations.

WHY THIS ARM SITS INSIDE THAT BOUNDARY RATHER THAN OUTSIDE IT. `error: Module not found "<path>"` is emitted when the entrypoint itself cannot be resolved, so no check code has run and no violation can have been reported. The hazard the boundary protects against — downgrading a check that crashed AFTER reporting real violations — cannot arise on this framing. It meets the criterion the comment at `:29-31` gives for the arm already there.

ONE RUNG IS CLOSED AND IT IS A DIFFERENT REMEDY. `check-run-check-routing` asserts every invoked script resolves to a file under the checks directory, now over 2370 commands across 59 loaded workflow files (1 declared unexaminable). That covers registrations. It does not cover another caller handing the runner a path, and resolving a registration is not classifying a death.

NOT MEASURED. Which other callers hand the runner a path.
