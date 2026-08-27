---
id: 8c2a2e97-4e99-51c1-9a87-32cf74d8b993
slug: evidence-trails-recover-as-husks
page-type-slug: finding
title: "Evidence trails recover as husks"
domain-slug: domain/global
---

# Claim

Findings cite `dirty/` paths as their evidence, and 285 of the 286 distinct paths cited are gone. Where this was first taken, recovering one the natural way yielded a husk rather than a failure: a source is emptied block by block before removal, so `git show <removal>^:<path>` returns the lines that happened to survive last, and nothing marks the difference. Here it yields nothing at all. No commit in this repository's history touches any of those paths, so the evidence behind 285 citations is reachable from no command in it. The trail is not hard to follow, it is unrecoverable, and a reader who meets one of these citations should treat the claim above it as unaudited rather than go looking.

# Evidence

Measured 2026-08-08 while draining `dirty/code/`, over the findings store as it then stood: deduplicated, 401 distinct cited paths, of which 57 stood and 344 were gone.

Re-measured 2026-08-27 in `/var/home/walton/repos/akasha`, where the store is `pages/finding/` and the quarantine is `dirty/`. `rg -o "dirty/[a-z-]+/[a-z0-9./-]+\.md" pages/finding/`, deduplicated, gives 286 distinct cited paths; testing each against the working tree gives 1 standing — `dirty/the-wandering-inn/story-skill/wide-sweep.md` — and 285 gone.

The recovery route named below is not merely misleading here, it is unavailable. Akasha's history holds no commit touching any of the gone paths: `git log --oneline -- dirty/code/docs-symlinks.md` counts 0 over a 5602-commit history, and `git log --diff-filter=D --name-only -- 'dirty/*'` names no removed `.md` at all. So `git show <removal>^:<path>` returns nothing rather than a husk, and the evidence behind 285 citations is reachable from no command in this repository.

THE HUSK IS THE POINT. A removed source did not vanish in one act: a seat cuts it block by block, each cut its own commit, then removes what is left. So the parent of the removal commit holds whatever was cut last and nothing else. On the worked example above, `git log --oneline -- dirty/code/docs-symlinks.md` counts 12 commits; the parent of the removal holds 5 of 61 lines. A reader who runs the obvious command gets a short, well-formed, syntactically complete document and no signal that 56 lines are missing.

The correct recovery point is the commit that ADDED the path — `git log --format=%H --reverse --diff-filter=A -- <path> | head -1` — which for most of this tree is the quarantine batch. I made this mistake myself and told several seats the wrong thing before catching it.

WHY THIS IS NOT THE DECIDED DANGLING-CITATION CLASS. `infra/cluster-checks/src/checks/check-repo-paths.ts` argues that a dead prose citation is "a dead link for a reader, never a path a program dereferences", and that stale prose is not what a deploy gate is for. That reasoning is about comments in shipped code. These are evidence trails in a corpus whose entire value is that a later reader can audit the claim rather than take it. And they are not dangling: they resolve, to the wrong thing.

Not established: how many of the 285 transcribe enough of their source that the path is provenance only. At least one seat checked exactly that before leaving its citation alone, which is the right call per citation and does not scale to 344.
