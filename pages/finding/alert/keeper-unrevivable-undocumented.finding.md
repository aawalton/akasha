---
id: b3edc05e-1014-5f34-8859-8e77e430e302
slug: keeper-unrevivable-undocumented
page-type-slug: finding
title: "Keeper unrevivable undocumented"
domain-slug: page-type/alert
---

# Claim

The `keeper-unrevivable` alert fires, reaches Alan directly, and has no document under `pages/alert/`. It is pushed from `tools/lib/keeper-unrevivable-push.ts`, one of the direct-to-Alan pushes the Direct To Alan rule on `pages/page-type/alert.page-type.md` weighs. That document carried an Intent entry reading `Every alert that fires has a document`, which named this state; the entry was removed in `89f842611` on 2026-08-13.

# Evidence

Reported by the reviewer seat `claude-alert-archivist-review-instructions` in its line-by-line reading of what is now `pages/page-type/alert.page-type.md` on 2026-08-13; its report stood at `~/agents/claude-alert-archivist-review-instructions/review-alert.md` and is gone. That seat searched the then-code repository for callers of the notify chokepoint, finding three; the same search here is `rg -n 'notify\(ALAN_PERSON'`.

I did not re-run either command, and did not list `pages/alert/` myself.

Not measured: whether any other firing emitter also lacks a document. The reviewer's search was for direct-to-Alan pushes, which is narrower than everything that fires.
