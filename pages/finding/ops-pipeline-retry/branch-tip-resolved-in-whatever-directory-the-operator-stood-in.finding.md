---
id: 072dc6e4-f60e-5866-ab1e-04b472300d4f
slug: branch-tip-resolved-in-whatever-directory-the-operator-stood-in
page-type-slug: finding
title: "Branch tip resolved in whatever directory the operator stood in"
domain-slug: ops-command/ops-pipeline-retry
---

# Claim

`ops pipeline retry` resolves the branch tip by running `git fetch` and `git rev-parse` in `process.cwd()`, so a run from anywhere that is not a checkout of the code repository resolves nothing and the verb refuses with `branch "<b>" not found on origin` — a claim about origin it never established. The branch is on origin; the command looked in the wrong repository. The operator is told the cure is a newer commit, which is false, so they act on it.

# Evidence

`tools/commands/pipeline/retry.ts` sets `const repoDir = process.cwd()` and passes it to every git call:

    getBranchTip: async (branch) => {
      const fetched = await runGit(["fetch", "origin", branch], repoDir)
      if (!fetched.ok) return null
      const rev = await runGit(["rev-parse", `origin/${branch}`], repoDir)
      if (!rev.ok || rev.stdout.trim() === "") return null
      return rev.stdout.trim()
    },

`packages/infra/ci/cli/src/pipeline/retry-internals/decide-retry.ts:176` renders a null tip as `unavailable (branch "<b>" not found on origin)`. Its own comment says null means "branch deleted, fetch failed" — two states it cannot tell apart, reported as the first.

Reproduced from the instructions repo on 2026-08-15, with the branch demonstrably on origin:

    $ git ls-remote origin refs/heads/project-19219    # run in ~/code
    29e4c78ac34b...  refs/heads/project-19219

    $ git fetch origin project-19219                   # run in ~/instructions
    fatal: couldn't find remote ref project-19219
    $ git rev-parse origin/project-19219
    fatal: ambiguous argument 'origin/project-19219': unknown revision

The seat delivering #19219 met this on `ops pipeline retry --seq 28088` and reported the contradiction without a mechanism.

The refusal's own text routes the operator wrong. It states "A newer commit has landed" and sends them to `ops pipeline redeploy`, which rebuilds current HEAD — a different act from the retry they asked for, chosen on a premise the command never tested.

Every other repo-reading `ops` verb takes `--repo-root` or resolves the code root explicitly; this one alone inherits the operator's cwd. Seats routinely stand in the instructions repo, a worktree, or `/var/tmp`.
