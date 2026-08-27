---
id: 40b5a07f-1f90-59db-9770-e84a37e0c98c
page-type-slug: finding
title: "ops reads the instructions repository's pages before it parses an argument, so the one write path cannot be used to finish moving itself"
domain-slug: ops-cli
---

# Claim

`akasha/repo/roots/roots.ts:50` evaluates `REPOS = namedOnDisk()` as a top-level const, and `namedOnDisk()` reads `<instructions root>/pages/repo` and throws where it is missing. That runs on import, on every invocation, before any argument is parsed. The moment that directory is not where `rootOf("instructions")` points, `ops write` cannot run at all.

# Evidence

Read 2026-08 against akasha and instructions at head.

`instructions/dotfiles/bin/ops:17` resolves `${INSTRUCTIONS_ROOT:-$HOME/repos/instructions}/tools/ops/cli.ts` and `exec bun`s it. So `INSTRUCTIONS_ROOT` must be exported and correct for the whole duration of any move of that tree, and there is no window in which the shim may point at a directory the move has already emptied.

`roots.ts:91` requires `${root}/.git` for a repo to count as cloned. A repository merged into another as a subdirectory therefore drops out of `rootsHere()`, and `akasha/checks/refusal/refusal.ts:37` throws.

`roots.ts:127` iterates `REPOS` alphabetically, so where two roots resolve to the same directory, the alphabetically first name wins every lookup and files reclassify without a word.

Not measured: whether any `ops` subcommand reaches its own argument parsing before this module is imported. Every path examined imported it first.
