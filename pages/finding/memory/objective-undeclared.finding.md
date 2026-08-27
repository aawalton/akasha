---
id: 7a2e8b83-7914-5f72-b520-37086729e14d
page-type-slug: finding
title: "Objective undeclared"
domain-slug: domain/global
---

# Claim

`objective` carries a sense of its own across the memory corpus — a checked box with a statement and a description slot — and no domain declares it, so two of the three units on `domains/memory.md` turn on a word Plain Or Declared says should have been declared first.

# Evidence

Measured 2026-08-11, on a `review-instructions` reading of `domains/memory.md` dispatched from `review-documents`. The reading raised it; the absence was re-checked here rather than taken from it.

No document under `domains/` declares `domain-slug: objective`. The reading also ran `ops instructions dag` and `ops instructions glossary --domain memory` and found no such slug, memory's five children being finding, initiative, memory-repo, project and theme.

`domains/global.md`, Plain Or Declared: "Write the plain phrase; where you give a word a sense of its own, declare it as a domain first. Nobody looks up a word they read as ordinary, so the wrong sense is carried off silently."

The sense is not the ordinary one. `tools/document/schemas/initiative.ts`, `theme.ts` and `project.ts` each construct an objective as `[x] **statement** description`, with the description a slot distinct from the statement. `domains/memory.md`'s End State rule reads "Write an objective's description so it still holds once its box is checked" and "Read it back ticked" — neither of which can be read in the ordinary sense of the word, an ordinary goal having no box and no second slot. Measured Figure likewise binds "in an objective".

Not measured: how many documents outside `domains/memory.md` use the word in this sense, or whether a reader has taken it in the ordinary sense and written the wrong thing. The reading named `define-definition` as the task that would settle it, which is definer work rather than a reader's.
