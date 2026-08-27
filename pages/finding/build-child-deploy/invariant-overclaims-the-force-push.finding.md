---
id: 2d538e85-4a90-581f-aa71-e52a8551ebee
page-type-slug: finding
title: "Invariant overclaims the force push"
domain-slug: domain/global
---

# Claim

The invariant says branch CI, the deploy and the live verification each force-push over a sibling's work. Verified true of the first two and false of the third: live verification pushes nothing. The same clause stands on `build-parent-deploy.md:66`.

# Evidence

Measured 2026-08-06.

`domains/tasks/projects/build-child-deploy.md:43` — "**Every act reaching past your own project is your manager's.** Branch CI, the deploy and the live verification each reach every sibling's work; running one force-pushes over them and reports success."

The reading that raised it ran the verbs rather than reading them, and reports: branch CI does force-push (`ops project check` pushes via `--force-with-lease`) and the deploy does rewrite HEAD (it rebases onto main). Live verification pushes nothing at all — its actual harm is different, that a child renders a verdict over the whole tree.

The prohibition is not undermined: it still stands on the first two, so a seat obeying it is not misdirected. What is wrong is the stated reason for one of its three subjects.

The mirror is at `domains/tasks/projects/build-parent-deploy.md:66` — "**Every act over the whole tree is yours alone.** Branch CI, the deploy and the live verification each reach past any one child's work; a child running one of them force-pushes over its siblings and reports success." Same three subjects, same over-claim.

Filed rather than repaired for two reasons the reading gave: the fix must land on both sites at once or the two documents disagree, and choosing which harm the replacement names — pushing over a sibling versus rendering a verdict over the tree — is a judgment rather than a correction.

Confirmed independently later the same day: the reading of `build-parent-deploy.md` reached the same verdict on line 66 without seeing this one, and added that line 33 of that document already states the force-push truly and narrowly of branch CI. So the invariant is both the looser statement and partly redundant with a line above it. That reading also reported every replacement it drafted was worse prose than what stands.
