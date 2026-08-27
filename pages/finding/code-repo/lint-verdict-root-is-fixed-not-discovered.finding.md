---
id: b7fa9e66-5f5c-5215-9d89-77905ddcddfa
page-type-slug: finding
title: "Lint verdict root is fixed not discovered"
domain-slug: repo/code-repo
---

# Claim

`ops lint-verdict --help` says `--repo-root` "defaults to git-discovered root". It does not discover: the default is fixed at the code repo, so the verb run from any other checkout silently lints a tree the caller never touched and reports a pass on it.

# Evidence

Measured 2026-08-06 from `/home/walton/instructions`, which is its own git repository and holds no `packages/` directory — `ls ~/instructions/packages` returns "No such file or directory".

`ops lint-verdict --help` states: "--repo-root <dir>  Override the repo root (defaults to git-discovered root)."

Run from that directory with no `--repo-root`:

    ops lint-verdict packages/infra
    VERDICT: PASS — the-linted-tree: packages/infra: 0 errors (0 warnings, 0 infos non-blocking); 9 tracked lintable file(s) under packages/infra were NOT opened (biome config / ignore exclusions) [over 2386 of 2395 files]

A path that does not exist under the git root of the working directory resolved and linted 2386 files. So the root is fixed at the code repository rather than discovered from the invocation, and the help sentence is false.

Independently corroborated by the reading of `domains/tasks/projects/build-child-deploy.md` on 2026-08-06, which ran the verb from `~/instructions` and from `~/worktrees/14237` and got byte-identical verdicts, 902 of 909 files.

Why it matters rather than being a wording slip: `build-child-deploy.md` stage 3 has a seat run this verb, and that seat works in `~/worktrees/<seq>`. Trusting the documented behaviour, it reads a verdict off the main code checkout instead of the worktree holding its own change — a pass on a tree it never touched, which is indistinguishable from a pass on its work.

The instruction surface is right and the verb's help is wrong, so the repair is in the code repository. Filed rather than landed for that reason.
