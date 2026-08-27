---
id: d1ffa1da-5423-5b2b-b196-1eeac4d749da
page-type-slug: finding
title: "Exit class bound nowhere"
domain-slug: page-type/old-ops-command
---

# Claim

The constraint that a refusal's exit code comes from the class raised, and that only the code repository's error classes carry it, stands in no domain document — so each verb that depends on it has been restating it in its own prose.

# Evidence

`exitCodeForThrowable` classifies on the class itself: `InputError` exits 1, `DataError` 2, `OperationalError` 3, and anything raised locally that merely spells the same fields exits 70. Verbs reach those classes through `tools/lib/code-input-error.ts` and `tools/lib/code-errors.ts`.

Before this pass the constraint was written out per-verb, in near-identical words, in headers across at least five namespaces — audit, exercise, music, oauth, project and temper all carried a copy. Judged against `domains/global.md`'s Single Authority, that is one claim bound in no document and copied into many.

Where the constraint IS stated today is `tools/lib/code-input-error.ts`'s own header — a code comment, and therefore itself due for removal under the same ruling that removed the copies. When it goes the claim is stated nowhere.

It has gone. Re-measured 2026-08-27: `tools/lib/code-input-error.ts` and `tools/lib/code-errors.ts` are both absent, and the classification now lives at `shared/errors-core/src/exit.ts` — `EXIT` at line 1 giving `INPUT: 1`, `DATA: 2`, `OPERATIONAL: 3`, `UNCLASSIFIED: 70`, and `exitCodeForThrowable` at :62 returning `err.code` only where `isCliError` matched one of four `instanceof` arms at :55-58. That file opens on the constant with no header at all, and nothing across the 1163 tracked `*.domain.md`, `*.page-type.md`, `*.command.md` and `*.role.md` pages binds the constraint. So the claim is now stated nowhere, exactly as this predicted.

The comparable constraint about capability modules is already bound once, at `domains/tasks/ops/move-command-bodies.md`, which is what let every namespace in this pass drop its per-verb copies without losing anything. This one has no such home.
