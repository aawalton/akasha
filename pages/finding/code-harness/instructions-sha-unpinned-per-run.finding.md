---
id: c4d215be-0797-5813-94a9-a5483262a6cb
slug: instructions-sha-unpinned-per-run
page-type-slug: finding
title: "Instructions sha unpinned per run"
domain-slug: domain/global
---

# Claim

A code-repo pipeline's verdict is not a function of the commit it judges. Every check reaching the instructions tree resolves it at whatever `main` holds the moment the step runs, so two runs of the identical code commit return different verdicts when the instructions repository moved in between, and the code repository records nothing saying which instructions commit judged it. The failure presents as a change being ejected for violations nowhere in its own diff.

# Evidence

Observed on merge-queue batch 11090 (pipeline 28154, staging tip 67ab4f2c, parent main 997aed46), which failed `check-code-comments` at 2026-08-16T19:35Z and ejected its only entry 11605, project #19282, owner awen.

That diff is 26 files, every one under `packages/alanwalton/awen/**`. The reported violations are in none of them: 1352 in `packages/alanwalton/native-shell/ios-widget`, 640 in that package's `scripts/render-harness`, 607 in `packages/shared/ring/ios-widget`, 354 in `packages/smilingjenny/native-shell/ios-widget`, 192 across two `scripts/decode-harness` directories, and `packages/temper/game/items/rules/core/spec/*.fizz`. All read `a prose comment, which no code comment form admits`.

Two instructions-repo commits landed between the last clean run and this one. Batch 11089 passed at 11:36Z. At 17:08Z `14f59880a` taught the scanner swift, rust, css, systemd units and fizz; at 17:09Z `e08d3b6db` widened `code-path` in `domains/code-comment.md` from `**/*.{ts,tsx,sh,sql,py,lua,toml,yaml,yml}` to a set adding `js,jsx,mjs,cjs,bash,rs,swift,css,service,timer,conf,fizz`. The flagged directories are exactly the newly admitted extensions. No code-repo commit touched `packages/infra/checks/` in that window.

The resolution is unpinned by construction: `packages/infra/checks/src/lib/instructions-tree.ts` prefers `INSTRUCTIONS_ROOT`, then `$HOME/instructions`, then clones, taking `git rev-parse main` at line 63 as the step runs. Nothing pins a sha per run and no pipeline record carries one.

Every entry is exposed, not one: `check-configs.ts` declares the step `alwaysRun: true` with no `args`, and `tools/code-comment/scan.ts` scopes by glob-matching `git ls-files` of the whole tree rather than the diff. The queue stands at 0 queued and 0 batched, so nothing has met this since.

I did not run the check; counts are read off 28154's own step log rather than measured fresh.
