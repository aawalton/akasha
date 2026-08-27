---
id: a844a6be-a192-5a43-afb1-9447c022ae1d
slug: code-cites-absent-document
page-type-slug: finding
title: "Code cites absent document"
domain-slug: domain/agent-turn-end
---

# Claim

Seven live source files under `packages/agents/cli/src/agent/` cite `domains/seat-turn-end.md` as where the turn-end rule is stated, and no such document exists. The rule stands at `domains/agent-turn-end.md`. The citation reaches an operator through deployed help text: `ops seat halt-census` prints it.

# Evidence

Reported by a dispatched `review-instructions` seat on 2026-08-11 and verified at the dispatching seat: `domains/seat-turn-end.md` is absent, `domains/agent-turn-end.md` is present, and a grep for the dead slug returns halt-census.ts, halt-census-core.ts, halt-census-baseline.ts, interactive-census.ts, interactive-census-core.ts, registry.ts and one unit test, plus built `dist/` copies.

Not measured: whether the document was renamed or never carried that name, and whether anything else in either repository cites it.
