---
id: 94e9ec70-62e0-5daa-881a-717c57f025aa
page-type-slug: finding
title: "Gate block needs a project row"
domain-slug: repo/code-repo
---

# Claim

Check Suppression on `domains/folders/code-repo.md` sends a seat to `ops seat gate-block` rather than suppressing a check. That verb requires `--seq`, a bound project row, and refuses without one, so a seat holding no project cannot reach the route the rule names. Code changes are made under a project, so the rule is not false — it is narrower than its wording, which names no such condition.

# Evidence

Observed by a dispatched `review-instructions` seat reading `domains/folders/code-repo.md` on 2026-08-11, which ran the verb's `--help` and confirmed it refuses a holder no agent row answers to.

Not measured: whether any seat has actually hit the refusal, and whether a seat outside a project ever reaches a check it wants suppressed.
