---
id: 59d19f86-dd3e-51ac-a392-f3f5d3545482
slug: code-grep-misses-command-backing
page-type-slug: finding
title: "Code grep misses command backing"
domain-slug: domain/ops-cli
---

# Claim

A file backing a live `ops` command has zero references in `~/code`, because the dispatcher stands in the instructions repository and names its handler by path string rather than importing the symbol. A reader count taken in the code repository therefore reports confident dead code for a file that is reached on every invocation.

# Evidence

On 2026-08-16, project #19282 reported `gm-migrate-tower-build.ts` and `rulebook-seed.ts` as having zero readers anywhere, measured by searching `~/code`. Both back live commands: `tools/commands/awen/gm-migrate-tower.ts:15` and `tools/commands/awen/populate-rulebook.ts:11` name them as path strings. A child project tested the number rather than inheriting it and restored both files before anything was committed.

A sweep of all nine files then in that project's scope found a third instance: `tools/commands/awen/seed-doctrine-pack.ts:9` reaches `doctrine-pack-seed.ts`. The sweep was widened to single-quoted and template-literal path forms as well as double-quoted, and no further instances were present in that package.

`domains/ops-cli.md` already states the underlying fact — the dispatcher stands in the instructions repository and every command it reaches is declared there. What is not stated anywhere is its consequence for measurement. The search that answers "does anything read this file" returns a clean zero with nothing marking it as partial, and both agents who hit it were verifying immediately before deleting, which is exactly when the count carries the most weight.

The failure is symmetric to the one it produces: a grep of the instructions repository for an imported symbol would likewise miss nothing, so there is no single search that answers the question. The reliable form is to sweep the instructions repository for the file's path as a string, in every quoting form, alongside the ordinary import search in the code repository.
