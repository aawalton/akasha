---
id: 73c743a1-d92d-5428-af12-f9790ee8792a
slug: help-flag-references-dispatch-blind
page-type-slug: finding
title: "Help flag references dispatch blind"
domain-slug: domain/global
---

# Claim

`check-cli-help-flag-references` reads a second repository and cannot be woken by a change to it. Its dispatch entry names only `ts-file`/`tsx-file` nodes in the code repo, while the surface it judges includes every `ops instructions` and `ops memory` verb, whose help is a header in the instructions repo's `tools/`. A header edited there adds a reference no code-repo commit wakes the check for, so the check is clean on the commit that broke it.

# Evidence

Read on branch `project-18484` at commit `e28ee613bf`, in `/home/walton/worktrees/18484`.

The dispatch entry at `packages/infra/checks/src/lib/check-configs-cli-registry.ts:68` declares `watchNodeTypes: ["ts-file", "tsx-file"]` and two `watchNodes`, and no `alwaysRun`. The two siblings in the same file whose subject is also the instructions repository — `commands-kept` and `seat-verb-flags` — both declare `alwaysRun: true`, at lines 115 and 144, each with a comment giving the same reason: their subject is a repository whose commits this pipeline's changed-file set says nothing about.

`git log main..HEAD -- packages/infra/checks/src/lib/check-configs-cli-registry.ts` returns one commit, `ad9c6a47b0`, which is #18453. Project #18450, which made this check read the instructions tree (`f3aa8a4fd3`), never touched the dispatch entry.

Demonstrated rather than inferred: with a `--unclaimed` reference planted in the `command:` header of `tools/governs.ts` in a copy of the instructions tree under `/var/tmp`, the check run against that tree exits 1 and names `ops instructions governs — command:description names \`--unclaimed\``. That violation lives entirely in the instructions repository and no code-repo file changed to produce it.

The `# Notes` of project #18450 record the ruling as taken — "THE DISPATCH QUESTION the seat raised, RULED by `dalla-lead`: TAKE IT" — and the widening it describes is not on the branch.
