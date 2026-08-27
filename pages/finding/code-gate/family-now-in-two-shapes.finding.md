---
id: da9e6b6c-16de-5f07-b79d-b6d116b0d079
page-type-slug: finding
title: "Family now in two shapes"
domain-slug: domain/global
---

# Claim

The gate family now reads in two shapes. `gate` was rewritten to stop restating its parent; `instructions-gate` and `code-gate` still carry the ancestor's whole sentence plus a repo. `instructions-gate` has a reason to, and `code-gate` does not.

# Evidence

The three definitions as they now stand:

- `domains/gate.md` — "**Gate** — a check run on a file change."
- `domains/instructions-gate.md` — "**Instructions gate** — code run on a file change in the instructions repo, to say if it may be made."
- `domains/code-gate.md` — "**Code gate** — code run on a file change in the code repo, to say if it may be made."

`domains/check.md` already binds "code run on a change to say if it may be made", so the two children restate an ancestor's whole sentence and add a repo.

Why the two differ. `instructions-gate` is named in `domains/schema.md` and `domains/instructions-harness.md`, so it is glossaried into surfaces where a reader meets its definition cold and its line has cause to stand alone. `code-gate` is named in no file but its own, so it renders only where `check` has necessarily been read.

The divergence was created by this reading rather than found by it. `99948fc8` on 2026-08-06 rewrote `gate`'s line, on the ground that `domains/domain-definition.md` puts a fact true of every sibling on the parent's line, and that the corpus's outliers were exactly these three: `check` does not restate `instrument`, and `principle`, `rule`, `finding`, `agent-mode`, `loop`, `tests`, `schema`, `agent-fleet` and `researcher` each write their own sentence.

Settling the family means deciding two other domains' definitions, which nothing governing a reading of `gate` reaches.

Raised by the `review-instructions` reading of `domains/gate.md` on 2026-08-06.
