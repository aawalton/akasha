---
id: 16698298-7f31-5b89-abac-2932871f6994
slug: no-gate-on-a-shell-removal
page-type-slug: finding
title: "No gate on a shell removal"
domain-slug: repo/akasha-repo
---

# Claim

Nothing guards a shell removal in akasha. A finding, an initiative or a project document can be deleted from a shell with no gate between the command and the removal, where the same act through `ops rm` is gated against the repository that would remain, reported before anything goes, and committed.

# Evidence

Raised by a review reading as one of two things it found outside its own document.

Verified: `tools/hooks/` holds hooks refusing a destructive git command, a root filesystem scan, a substituting backtick, a direct addon install, a stray Playwright filename and a whole-suite run. None of them matches a shell `rm`. The two hooks the original reading named — one refusing writes into a Claude Code agent-memory store, one guarding code worktrees — no longer exist, and nothing took their place.

I did not attempt a shell removal to confirm the absence, and would not: the act is the loss.

`ops rm` refuses where a surviving file still names or imports what would go, and commits the removal with the files it took without being asked named in the message. A shell `rm` reads nothing and records nothing, so what it takes leaves the worktree with no verdict anywhere on whether it should have.

This costs more than when it was raised. akasha absorbed every other repository, so what a shell removal takes has no copy in another tree.
