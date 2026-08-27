---
id: 3a282ed2-3fb0-5bdd-ab6d-f73acff48050
page-type-slug: finding
title: "Neither child can escalate"
domain-slug: barred-meaning/project
---

# Claim

Neither child build document has an escalation bullet, and the child is the seat most likely to need one. `build-child-commit` and `build-child-deploy` both carry zero; the two singleton documents carry one and three, and the two parent documents two and four. A child checks inside a worktree its siblings are editing, so a failure in what it did not touch is the ordinary case for it and the rare case for the others.

# Evidence

Raised by the review-instructions reading of `domains/tasks/projects/build-child-deploy.md` on 2026-08-07, which reported that all three of its siblings carry such a bullet.

Verified myself, and the shape is sharper than reported: `grep -c "Escalate" domains/tasks/projects/*.md` returns 0 for build-child-commit, 0 for build-child-deploy, 2 for build-parent-commit, 4 for build-parent-deploy, 1 for build-singleton-commit and 3 for build-singleton-deploy. So it is not one document missing what three have — it is BOTH children missing what all four others carry.

The reviewer notes the Run bullet explains why to go per-package and says nothing about what to do when a sibling's failure surfaces anyway. I read that bullet and agree it does not reach the case; I did not attempt the repair.
