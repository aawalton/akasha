---
id: 7082ccc3-a252-595d-af20-65b2e30094ca
slug: lint-verdict-measures-the-main-checkout
page-type-slug: finding
title: "Lint verdict measures the main checkout"
domain-slug: domain/global
---

# Claim

`ops lint-verdict` measures `~/code` rather than the worktree it is run from. `getRepoRoot()` walks up from the module's own directory and `ops` always executes out of `~/code`, so a worker's lint verdict is about code it did not write. 101 of 174 checks take no `--repo-root` override.

# Evidence

Measured 2026-08-02, first-hand, from cwd `/home/walton/worktrees/17438`.

Three runs of the same verb over the same path, differing only in the root:

- `ops lint-verdict packages/agents/shared` — PASS, `[over 321 of 321 files]`
- `... --repo-root /home/walton/worktrees/17438` — PASS, `[over 323 of 323 files]`
- `... --repo-root /home/walton/code` — PASS, `[over 321 of 321 files]`

The default and the explicit `~/code` agree down to the denominator; the worktree's own answer counts two files neither sees. The verdicts agree only because `~/code` is on `main` and clean at filing, which is what makes the substitution read as harmless.

It did not agree earlier. The seat holding #17438 got PASS from the verb on a tree `bun run lint` exited 1 on, over one `assist/source/organizeImports` diagnostic, confirmed against the worktree's own biome binary at the same moment. Only `bun run lint` caught it. That error is fixed, so the denominator is what reproduces today.

`lib/repo-root.ts:42` is the cause: `let dir = import.meta.dir`, walked up to `bun.lock` and memoized. Its docblock states the pinning is deliberate — it keeps resolution correct for `ops project deploy` loading a branch's `.workflow.ts` from the main repo. That is right for a caller whose subject is its own tree and wrong for one whose subject is the tree it was invoked from. `which ops` resolves under `/home/walton/code`, so the walk never leaves it.

174 check executables under `packages/infra/checks/src/checks/` call `getRepoRoot()`; 73 accept `--repo-root`. The rest cannot be aimed at the caller's tree at all.

`tasks/projects/build-child-deploy.md` and `tasks/projects/build-singleton-deploy.md` name it as the `checks` lint instrument, and both now pass `--repo-root` — a workaround on two documents, not a fix. `domains/code.md:12` records that `~/code` "is routinely parked on a project branch's tip", so the substituted tree can carry another project's unmerged work while lacking what deployed. Nothing in the output names the root it measured.
