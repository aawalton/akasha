---
id: f78e39b2-4bda-552f-91b3-901b15189bf8
page-type-slug: finding
title: "Being live false for a child"
domain-slug: domain/global
---

# Claim

`developer` is defined as answerable for a change "being live", which is false of a child developer: that task's own invariant hands every act reaching past the project to the manager, and `manager` is defined as answerable for reaching production.

# Evidence

`domains/roles/developer.md`: "**Developer** — the role answerable for one project's change existing, working and being live."

`domains/roles/manager.md`: "**Manager** — the role answerable for one parent project reaching production, children and all."

`domains/tasks/projects/build-child-deploy.md:34`: "Your parent holds the branch, so nothing of your change is live when you leave."

`domains/tasks/projects/build-child-deploy.md:43`: "**Every act reaching past your own project is your manager's.** Branch CI, the deploy and the live verification each reach every sibling's work; running one force-pushes over them and reports success."

The clause turns on a reading no instrument settles: answerable for *making* it live, which is false in the child case, against answerable for it *reaching* production through the manager, which is true and is the reason a child hands up what needs deploying.

Not rewritten by the reading, because redrawing a boundary between two roles is a `define-definition` call rather than a repair.

Raised by the `review-instructions` reading of `domains/roles/developer.md` on 2026-08-05.
