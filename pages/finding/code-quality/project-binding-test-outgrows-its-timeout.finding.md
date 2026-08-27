---
id: 6b436e70-5605-5fc8-bdc1-080f99c9fda6
slug: project-binding-test-outgrows-its-timeout
page-type-slug: finding
title: "Project binding test outgrows its timeout"
domain-slug: domain/code-quality
---

# Claim

`packages/agents/shared/project-binding.unit.test.ts` fails on bun's 5-second default timeout and passes at 30 seconds. It spawns one subprocess per domain in the instructions corpus, so its runtime is set by how many domains exist rather than by the code under test, and it slows every time one is added. Nothing reports it: CI skips the file through `skipIf(!instructionTreePresent())`, so the only reader who meets the failure runs the suite locally.

# Evidence

Measured on 2026-08-06 while verifying #18032, whose seat flagged it and correctly declined to fix it.

At bun's default timeout: 35 pass, 1 fail, 5.24s. At `--timeout 30000`: 36 pass, 0 fail, 13.23s. Same file, same commit, deployed `main` at `492e9043`.

The corpus stood at 257 domains when the delivering seat measured it and 258 at this verification. Two subprocesses per domain at roughly 21ms each is where the 13 seconds comes from, so the figure moves with the corpus and with nothing else. The change under review does not touch this file.

Not filed as a defect in #18032's work: the delivering seat established it against unmodified mainline, and this verification reproduced both the failure and the 30-second pass without any of that change in the way.
