---
id: d1ffa1da-5423-5b2b-b196-1eeac4d749da
page-type-slug: finding
title: "Exit class bound nowhere"
domain-slug: page-type/ops-command
---

# Claim

The constraint that a refusal's exit code comes from the class raised, and that only the code repository's error classes carry it, stands in no domain document — so each verb that depends on it has been restating it in its own prose.

# Evidence

`exitCodeForThrowable` classifies on the class itself: `InputError` exits 1, `DataError` 2, `OperationalError` 3, and anything raised locally that merely spells the same fields exits 70. Verbs reach those classes through `tools/lib/code-input-error.ts` and `tools/lib/code-errors.ts`.

Before this pass the constraint was written out per-verb, in near-identical words, in headers across at least five namespaces — audit, exercise, music, oauth, project and temper all carried a copy. Judged against `domains/global.md`'s Single Authority, that is one claim bound in no document and copied into many.

Where the constraint IS stated today is `tools/lib/code-input-error.ts`'s own header — a code comment, and therefore itself due for removal under the same ruling that removed the copies. When it goes the claim is stated nowhere.

The comparable constraint about capability modules is already bound once, at `domains/tasks/ops/move-command-bodies.md`, which is what let every namespace in this pass drop its per-verb copies without losing anything. This one has no such home.
