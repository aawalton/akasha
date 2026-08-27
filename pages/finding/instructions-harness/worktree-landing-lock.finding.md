---
id: f033cdac-f04c-52a4-afd0-e09c866a5f96
page-type-slug: finding
title: "Worktree landing lock"
domain-slug: domain/global
---

# Claim

`ops instructions write` cannot land in a git worktree, and reports the refusal as a live writer holding a lock.

`whileHoldingLanding` in `tools/lib/git.ts` locks at `join(root, ".git", "harness-landing.lock")`. In a linked worktree `.git` is a FILE holding a `gitdir:` pointer, not a directory, so every acquire throws `ENOTDIR`, the liveness read of the same path answers false, and the loop spins the full 120s ceiling before naming a holder that never existed.

# Evidence

Met while running `move-command-bodies` for the `oauth` namespace, whose step 5 says to prove each moved verb "in a worktree, reached by pointing `INSTRUCTIONS_ROOT` at it".

`INSTRUCTIONS_ROOT=/var/home/walton/worktrees/oauth-bodies ops instructions write --input-file <payload>` ran every gate to a pass and then exited 3 with:

    another writer has held /var/home/walton/worktrees/oauth-bodies/.git/harness-landing.lock for 120s, so this landing never ran — nothing was committed. Whoever holds it is alive and stuck mid-landing; read that process before clearing the file.

No such file existed, in the worktree or in the real gitdir: `find` over `/var/home/walton/worktrees/oauth-bodies/.git` matched nothing, and neither `/var/home/walton/instructions/.git/harness-landing.lock` nor `/var/home/walton/instructions/.git/worktrees/oauth-bodies/harness-landing.lock` was there. `/var/home/walton/worktrees/oauth-bodies/.git` is a 66-byte regular file reading `gitdir: /var/home/walton/instructions/.git/worktrees/oauth-bodies`.

The files themselves DID reach the worktree's disk — the ten command files and ten domain documents were all written and left uncommitted — so the lock guards the commit rather than the write, and a refused landing in a worktree leaves ungated-looking content standing there.

What the message tells a reader to do is the part worth weighing: it says to go and read a process that does not exist, and the pid it would have named is in a file that could not be created.
