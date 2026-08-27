---
id: 687a6f9a-a145-5469-b385-d9b61359dfe8
page-type-slug: finding
title: "Ast unused root attribution"
domain-slug: domain/global
---

# Claim

`check-ast-unused` answers the same verdict whichever way its `--repo-root` is spelled, and still credits its population to a different repository: reached through the `/home` symlink it reports the code repo UNMEASURED, files all 380 workspaces under `outside declared repos`, and exits 0.

# Evidence

`/home` is a symlink to `/var/home` on this workstation, so one directory is reachable under two spellings. `resolve()` normalises a path without resolving its symlinks, and `check-ast-unused.ts:232` builds its root with `resolve(repoRoot)` — the site `Real Path` on `domains/code-quality.md` names.

Measured 2026-08-15 on clean `main` at 12dbfe915b, both runs against a fresh cache directory:

  --repo-root /var/home/walton/code
    zero unused exports, exit 0
    [repos: code-repo 380, instructions 973, ...] [read under: /]

  --repo-root /home/walton/code
    zero unused exports, exit 0
    [repos: code-repo UNMEASURED, instructions 973, ..., outside declared repos 380] [read under: /home/walton]

Both analysed 13470 modules across 380 workspaces and 12404 entry files, so nothing is dropped from the graph and the verdict is the same one. What moves is which repository the 380 workspaces are credited to, and the run that credits none of them to the code repo still exits 0 — an instrument saying it did not measure a repository, and passing.

THE PIPELINE IS NOT EXPOSED TO THIS, which is the part worth having measured rather than assumed. The check is registered with no repo-root override, so it takes `getRepoRoot()`, and that walks up from `import.meta.dir`. Bun resolves a module path through its symlinks before that walk begins: loaded through `/home/walton/code/...` and through `/var/home/walton/code/...`, `getRepoRoot()` answers `/var/home/walton/code` both times. A tree extract under `git archive | tar -x` holds no symlink to diverge through either.

So what remains is a hand invocation: a `--repo-root` typed with the symlink spelling, or a `--config` outside the root, whose repo root is derived by the same unresolved `resolve`.
