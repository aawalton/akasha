---
id: b3edc05e-1014-5f34-8859-8e77e430e302
page-type-slug: finding
title: "Keeper unrevivable undocumented"
domain-slug: page-type/alert
---

# Claim

The `keeper-unrevivable` alert fires, reaches Alan directly, and has no document under `domains/alerts/`. It is pushed from `packages/agents/supervisor/src/keeper-unrevivable-push.ts`, one of the two direct-to-Alan pushes the Direct To Alan rule on `domains/alert.md` weighs. That document carried an Intent entry reading `Every alert that fires has a document`, which named this state; the entry was removed in `89f842611` on 2026-08-13.

# Evidence

Reported by the reviewer seat `claude-alert-archivist-review-instructions` in its line-by-line reading of `domains/alert.md` on 2026-08-13; its report is at `~/agents/claude-alert-archivist-review-instructions/review-alert.md`. That seat ran `grep -rn "notify(USER_ID" packages` in the code repository, finding three callers, and `bun tools/governs.ts` against the emitter.

I did not re-run either command, and did not list `domains/alerts/` myself.

Not measured: whether any other firing emitter also lacks a document. The reviewer's search was for direct-to-Alan pushes, which is narrower than everything that fires.
