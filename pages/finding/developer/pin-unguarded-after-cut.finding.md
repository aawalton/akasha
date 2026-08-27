---
id: 84e1b9ad-bc37-52ea-a2b0-b798aaa2ba31
page-type-slug: finding
title: "Pin unguarded after cut"
domain-slug: domain/global
---

# Claim

Nothing on `developer` now tells a seat to check the task it was pinned to. The line that was the surface's only mention of `live-on` was cut as instructing a selection the reader never makes, and it was also the only thing that could have caught a mis-pinned seat — though as written it caught none.

# Evidence

The cut line read: "Build the change by the task your project's shape and `live-on` name." Removed by commit `b7eeffb8` on 2026-08-05.

The ground for cutting it: every path onto a developer seat pins the task before the seat exists. `ops seat start --help` says of `--task` — "The axis no interactive launcher can supply, because a person opening a terminal has not yet decided — a dispatcher has, before the seat exists." `domains/tasks/lead/dispatch-project.md` has the lead naming `build-singleton-deploy` or `build-singleton-commit`; `build-parent-deploy.md` and `build-parent-commit.md` have the manager naming `build-child-deploy` or `build-child-commit`. So the line instructed a selection this reader never makes, and what remained after stripping the selection clause restated the Definition directly above it.

What went with it. `rg "live-on" domains/roles/developer.md` now returns nothing, so the surface names the key nowhere. And the line was the only thing on it bearing on a mis-pin — a costly error, since a child developer running `build-singleton-deploy` starts a worktree its parent owns.

As written it would not have caught one: it does not say to check the pin, and a reader arriving with a task already in hand reads it as satisfied.

Writing the check it failed to make is an Add, which `review-instructions` admits only where an instrument settles what it should say. One decision settles both halves — whether the surface should name `live-on`, and whether it should guard the pin.

Raised by the `review-instructions` reading of `domains/roles/developer.md` on 2026-08-05.
