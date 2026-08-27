---
id: ab73587b-c84c-50b1-932d-9c0a6559f2dc
page-type-slug: finding
title: "Definition points not names"
domain-slug: repo/instructions-repo
---

# Claim

`instructions-repo` is the one repo-root folder whose definition points instead of naming what is inside it, and once the parent's fact is removed the only word left doing its own work is "this".

# Evidence

`domains/folders/instructions-repo.md` reads: "**Instructions repo** — the local domain of this repository."

`domains/folder.md` already binds "one specific directory in a repository, and everything under it", so "the local domain of" is the parent's fact restated.

The five repo-root folders:

- `code-repo` — "the local domain of the monorepo: the products, the agent fleet and the infrastructure"
- `memory-repo` — "the local domain of the repository memory documents sit in"
- `books-repo` — "the repository of Alan's non-fiction: what he studies, records and works out"
- `stories-repo` — "the repository of the fiction in Alan's life, his own and everyone else's"
- `instructions-repo` — "the local domain of this repository"

The document's own `instructions-path` settles the material — `domains/`, `tools/`, `settings/`, `notices/`, `dirty/` — but not which of it one sentence should name, so the reviewer left it rather than performing an Add resting on judgment.

Two things bear on whichever way this goes. Nothing declares `instructions-repo` in a `glossary:`, so every reader of the deictic is already inside the repository it points at and it always resolves. And "the local domain of" is a frame `code-repo` and `memory-repo` share while "local domain" is defined nowhere — so if the frame is what is wrong, the repair is one horizontal pass over three surfaces rather than three separate readings.

Raised by the `review-instructions` reading of `domains/folders/instructions-repo.md` on 2026-08-05.
