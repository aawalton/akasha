---
id: 5844037d-9f1f-5311-a7e5-a6172d54b264
slug: worktree-existence-passes-by-substring-luck
page-type-slug: finding
title: "Worktree existence passes by substring luck"
domain-slug: domain/global
---

# Claim

`createWorktreeForProject` decides a worktree already exists with `listResult.stdout.includes(worktreeDir)`. `git worktree list --porcelain` prints the real path and every agent-typed path uses the symlinked spelling, so the comparison is correct today only because `/var/home/walton/...` happens to contain `/home/walton/...` as a substring. Anything that changes either root flips it to false for every worktree at once, and the failure is silent in the expensive direction.

# Evidence

THE COMPARISON, READ TODAY. `packages/infra/git/cli/src/lib/worktree-ops.ts:175-176`:

    const listResult = await runGit(["worktree", "list", "--porcelain"], GIT_REPO_DIR)
    const registered = listResult.ok && listResult.stdout.includes(worktreeDir)

`worktreeDir` is built from `WORKTREE_BASE`, declared at `packages/infra/git/cli/src/lib/worktree.ts:34` off the environment. The line number has moved since this was first read — it was 103 — and the comparison has not.

THE COINCIDENCE STILL HOLDS, MEASURED HERE. `$HOME` is `/home/walton`; both `/home/walton` and `/var/home/walton` stat as the same directory. `bun -e 'console.log("/var/home/walton/worktrees/16314".includes("/home/walton/worktrees/16314"))'` prints `true`. So the idempotency check passes by an accident of two spellings rather than by construction: the real path git prints contains the symlinked path the caller holds.

WHAT FLIPS IT. A different mount layout, a non-Bazzite host, or a `$HOME` that is not under `/var` — any of which makes the real path stop containing the symlinked one. It fails for every worktree at once, and it fails silently in the expensive direction: `registered` goes false, so `git worktree add` is re-run on a path that already exists.

WHAT WOULD MAKE IT CORRECT BY CONSTRUCTION. Comparing resolved paths rather than substrings — `realpathSync` on both sides, or parsing the `worktree ` lines out of the porcelain output and comparing entries rather than searching the whole blob. Neither is done here; `worktree-ops.ts` mentions no `realpath` anywhere.

NOT MEASURED. Whether any other call site compares a git-printed path against an agent-typed one the same way, and whether the CI pods' `$HOME` layout differs from the workstation's — which would be the first place the coincidence stops holding.
