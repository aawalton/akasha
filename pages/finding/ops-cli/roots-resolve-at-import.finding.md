---
id: 40b5a07f-1f90-59db-9770-e84a37e0c98c
slug: roots-resolve-at-import
page-type-slug: finding
title: "ops reads the instructions repository's pages before it parses an argument, so the one write path cannot be used to finish moving itself"
domain-slug: ops-cli
---

# Claim

`akasha/repo/roots/roots.ts:89` evaluates `REPOS = namedOnDisk()` as a top-level const, and `namedOnDisk()` (`roots.ts:80-87`) reads `<akasha root>/pages/repo` and throws where it is missing. That runs on import, on every invocation, before any argument is parsed. The moment that directory is not where `HERE` points, `ops write` cannot run at all.

# Evidence

Read 2026-08 against akasha and instructions at head.

`akasha/dotfiles/bin/ops:12` resolves `${AKASHA_ROOT:-$HOME/repos/akasha}/tools/ops/cli.ts` and `exec bun`s it. So `AKASHA_ROOT` must be exported and correct for the whole duration of any move of that tree, and there is no window in which the shim may point at a directory the move has already emptied.

`roots.ts:131` and `roots.ts:152` require `${root}/.git` for a repo to count as cloned. A repository merged into another as a subdirectory therefore drops out of `rootsHere()`, and `akasha/checks-system/refusal/refusal.ts:35` throws through `rootFor` at `roots.ts:173`.

`locate` at `roots.ts:189` iterates `REPOS` alphabetically — sorted at `roots.ts:77` — so where two roots resolve to the same directory, the alphabetically first name wins every lookup and files reclassify without a word.

Not measured: whether any `ops` subcommand reaches its own argument parsing before this module is imported. Every path examined imported it first.
