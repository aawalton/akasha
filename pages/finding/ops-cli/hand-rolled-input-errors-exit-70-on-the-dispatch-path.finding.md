---
id: e294bffa-3d8d-5e0d-8875-83a262783cb0
page-type-slug: finding
title: "Hand rolled input errors exit 70 on the dispatch path"
domain-slug: domain/ops-cli
---

# Claim

A hand-rolled input error thrown by a moved command body exits 70 rather than 1, reporting a user's typo as an unhandled defect. `tools/lib/active-core.ts` carries such a class, and its own header claims it holds "the two fields anything reads" — which is wrong for the path every ops verb takes.

# Evidence

Found 2026-08-13 by the seat moving the `contacts` bodies, which changed its design because of it.

`exitCodeForThrowable` in `packages/shared/cli-core/src/exit.ts` classifies through `isCliError`, which is four `instanceof` arms and reads no field at all. So classification turns on identity, never on a `name` or a `code` — and a class carrying both fields correctly is still unclassified.

Nothing live is broken by it today: no file under `tools/commands/` imports `active-core.ts` or `verb-args.ts`, so the class has no reader on the dispatch path yet. It is right for the in-repository callers it was written for. What is wrong is the header's claim to generality, which is exactly what a seat moving a body would read before rolling its own.

The contacts seat added `tools/lib/code-input-error.ts`, which resolves the real class, and every refusal it moved exits 1 because of it. That library was broadcast to the eight body seats then running. The remaining judgment is what to do about `active-core.ts`'s header, which is about that file's port queue rather than about any one namespace.
