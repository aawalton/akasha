---
id: b922c207-ef0b-52ce-a139-1c648b07c8e1
slug: type-refusal-demonstrated-on-literals
page-type-slug: finding
title: "Type refusal demonstrated on literals"
domain-slug: domain/global
---

# Claim

Nothing in the corpus binds the claim that a type-level refusal must be demonstrated at a call site passing a variable. Excess-property checking binds fresh object literals alone, so a demonstration built from literals goes red while every live call site passing a variable of the wider type compiles clean. `domains/file-kinds/typescript.md` governs every `.ts` and `.tsx` in both repositories and carries a Definition and two path globs — no Principles, no Rules.

# Evidence

Found ingesting `dirty/skills/agent-harness/rulings/rows.md`, a lead's ruling of 2026-07-28. Kept verbatim at `dirty/maybe-keep/skills/agent-harness/rulings/rows.md`; filed here because that copy is queued for its own sweep.

VERIFIED FIRSTHAND rather than reasoned from the language spec. A scratch file, `bunx tsc --noEmit --strict`:

    type Narrow = { a: number }
    type Wider = { a: number; b: number }
    const f = (x: Narrow) => x.a
    f({ a: 1, b: 2 })            // TS2353
    const v: Wider = { a: 1, b: 2 }
    f(v)                          // no error

One error, on the literal, and silence on the variable.

Searched all of `domains/` for `excess.propert|object literal|literals|freshness|widen` case-insensitively: four hits, three of them check names in `domains/lists/unresolved-checks.md` and one the ingest task's own Widen step. Searched `~/memory/findings/` with `rg -uuu` for `excess.propert|object literal|TS2353|demonstration`; the nearest, `instrument/gate-subject-causes-its-population.md`, is a different claim.

The two adjacent live rules reach past this, and one makes it worse. `domains/file-kinds/tests.md` Contract Oracle refuses an oracle built from the implementation's own recipe. `domains/tasks/lead/verify-handback.md` says to run each criterion's named instrument yourself — which here reproduces the wrong answer, the verifier re-running the same literals demonstration and meeting the same red.

WHAT WHOEVER PICKS THIS UP MUST WEIGH: a rule on `domains/file-kinds/typescript.md` is read at boot by every seat touching TypeScript, and binds only a seat demonstrating a type-level refusal.

NOT MEASURED: whether any live demonstration in either repository is built from literals only. I swept for the doctrine, not for instances of the defect.
