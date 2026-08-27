---
id: 019f3a1c-4d21-7c30-9e55-2a6b18d0c4f7
page-type-slug: finding
title: "Worktree copies count as required reading"
domain-slug: domain/agent-harness
---

# Claim

A worktree under `.claude/worktrees/` inside the instructions repo puts a second copy of every domain page in the tree, and the required-reading scan counts those copies as documents a seat has not read. Any seat that has read the real pages is refused anyway, and the refusal permits only `Read`, `Grep` and `Glob` until it reads the duplicates.

# Evidence

At 2026-08-22, holding a full reading of `pages/domain/global.md` and ten others, a `Bash` call was refused with eleven documents listed as NOT YET READ. Every path named was `.claude/worktrees/agent-adcfdb755c76291a0/pages/...`, and every one was a copy of a page already read at its own path. The bodies are identical; only the prefix differs.

The cost is not the reading. It is that the refusal bars `Bash`, so a seat cannot run `ops`, cannot commit, and cannot look at the worktree to judge whose it is. Foreign State says treat it as another agent's work until you find out otherwise, and the one tool that would find out is the barred one.

Nine of the eleven files were already gone by the time they were read, and the whole worktree had vanished a moment later: it belonged to a live agent and was cleaned up on its own. So the block came from another seat working normally, not from debris. That is what makes it worth recording rather than clearing — every `isolation: worktree` agent creates this for every seat running beside it, for as long as it runs.

Worth deciding: whether the scan should skip `.claude/worktrees/`, or whether a page read at its own path counts as read wherever a copy of it stands.
