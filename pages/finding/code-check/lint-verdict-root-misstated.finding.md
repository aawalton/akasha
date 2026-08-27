---
id: 5a0f76d5-6e0c-550b-a36b-7bff040dc731
page-type-slug: finding
title: "Lint verdict root misstated"
domain-slug: domain/global
---

# Claim

`ops lint-verdict --help` documents `--repo-root` as defaulting to the git-discovered root. It does not: it defaults to `~/code` whatever the caller's cwd, and its verdict line names no root — so a run pointed at the wrong tree reports `biome opened 0 files` rather than naming the tree it opened them in.

# Evidence

Measured 2026-08-05 from cwd `/home/walton/instructions`, whose git-discovered root is the instructions tree (`git rev-parse --show-toplevel` → `/var/home/walton/instructions`).

Run 1 — no `--repo-root`:

    $ ops lint-verdict tools/checks
    VERDICT: UNKNOWN — the-linted-tree: biome opened 0 files for target tools/checks
    — a verdict over an empty cohort is not a verdict [over 0 files]
    exit 2

Run 2 — the git-discovered root forced explicitly, as a negative control:

    $ ops lint-verdict tools/checks --repo-root /home/walton/instructions
    VERDICT: UNKNOWN — the-linted-tree: biome could not be run for target tools/checks:
    ENOENT: no such file or directory, posix_spawn
    '/home/walton/instructions/node_modules/.bin/biome'
    exit 2

The two runs fail differently, and that is what settles it. There is no biome binary anywhere under the instructions tree, so had run 1 used the git-discovered root it would have raised the same ENOENT run 2 raises. It did not — biome executed and opened zero files, which means the root it resolved was one where biome exists and `tools/checks` does not. `/home/walton/instructions/tools/checks` exists; `/home/walton/code/tools` does not exist at all.

Neither verdict line names the root it measured, which is what leaves the two failures looking like one class of mistake to a caller reading only stdout.

Noticed while reviewing the developer task at `tasks/projects/build-singleton-deploy.md`, whose `checks` stage states the true behaviour and instructs the reader to pass `--repo-root` because of it. The instruction corpus and the verb's own help disagree, and the measurement above puts the help on the wrong side. A reviewer trusting the help over the corpus would repair a true instruction into a false one.
