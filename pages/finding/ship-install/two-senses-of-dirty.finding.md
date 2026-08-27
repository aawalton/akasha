---
id: 93816345-4816-5e4b-b4ea-712a5a7119ab
slug: two-senses-of-dirty
page-type-slug: finding
title: "Two senses of dirty"
domain-slug: task/ship-install
---

# Claim

"Dirty" carries two senses across `ship-install`, and the code holding the second says the first is impossible. Stage 2 counts untracked files, and the reviewer reproduced `git merge --ff-only` aborting over one. The sweep behind stage 4 drops untracked before calling a tree dirty, and `sweep-window-guard.ts` justifies that in a comment: untracked files "never block `git merge --ff-only`". Neither line misleads its own reader, so both were left standing.

# Evidence

Raised by the review-instructions seat on `domains/tasks/ios-install/ship-install.md` as one of three it could not reach from any line.

Verified myself: `parseMacTreeState` in `packages/alanwalton/mobile-cli/src/mobile/sim/sweep-window-guard.ts` filters entries whose index and worktree are both `?` and marks dirty only on what remains. Its doc comment reads that untracked files "never block `git merge --ff-only` and are typically build detritus on a build host, not in-flight tracked work".

The reviewer's throwaway-repo reproduction is what makes the comment's first clause false: an untracked file at a path main also holds aborts the merge, because git refuses to overwrite it. I did not run that reproduction; I read the code and the two document lines.

So this is a third claim beyond the reviewer's two senses — the comment states a general rule with a live exception, in a file whose whole job is deciding when to skip.
