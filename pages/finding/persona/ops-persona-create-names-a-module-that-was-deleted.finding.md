---
id: d3e13dbd-c092-5a6f-97cd-32293293c878
page-type-slug: finding
title: "ops persona create names a module that was deleted"
domain-slug: page-type/persona
---

# Claim

`ops persona create` reaches for a code-repo module that no longer exists, so the command throws where it would write a new persona. Nothing reports it, because the reference is a string resolved at call time rather than an import anything typechecks.

# Evidence

Read on 2026-08-19. `tools/commands/persona/create.ts:20` declares `const CREATE_PROPERTIES = "packages/alanwalton/personas/cli/src/persona/create.ts"` and hands it to `codeModule` to reach `buildPersonaCreateProperties`.

That file is gone. Only `packages/alanwalton/personas/cli/dist/src/persona/create.d.ts` survives, which is a type declaration and holds no code. `codeRefFile` in `tools/lib/code-import.ts:13-14` joins a reference ending in `.ts` straight onto the code root and does no fallback, so the path is read literally and resolves to nothing.

This is the unswept half of a deliberate removal. `buildPersonaCreateProperties` was deleted for having no work left once a persona became a file, and the caller was left naming it.

The value it built is `pointsPathPrefix`, which stands on four persona rows. That key already has no other writer anywhere in either repository, so with this caller dead nothing writes it at all — it is a read-only leftover, like the six points-source keys beside it.

Not measured: whether `ops persona create` should write a row at all now that a persona is a file, which is the larger question this sits inside. Fixing the reference and leaving the command writing rows would restore a writer to a store the persona is leaving.
