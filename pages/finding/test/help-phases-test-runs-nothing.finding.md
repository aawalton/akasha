---
id: 02694a82-892b-50fa-b966-a351e8dbfba7
page-type-slug: finding
title: "Help phases test runs nothing"
domain-slug: domain/test
---

# Claim

`packages/alanwalton/projects/cli/src/project/deploy-help-phases.unit.test.ts` runs no tests and reports PASS, because the file it reads no longer stands in the code repository.

# Evidence

The file opens `src/project/deploy.ts` at import time to compare the deploy verb's help text against the phases the deploy path actually runs. That module left the code repository in commit `627db0ce`, "the command surface leaves the code repo, and what still reads it is repaired rather than followed", and the test was not repaired with it.

What the run does now is throw `ENOENT` before any test is registered. `ops tests run` on that path alone reports `0 pass, 0 fail, 1 error, Ran 0 tests across 1 file` and then `VERDICT: PASS`, exit 0 — the verdict is pinned to the fail tally, and a tally of zero is what a suite that never ran produces as well as a green one. The same error surfaces inside the package-wide run, where it is one unhandled error beside 1282 passing tests.

Reproduced on untouched `main` in `~/code`, so it is not an artefact of any worktree. The assertion it used to make — that the help text claims a phase if and only if the deploy path runs it — is currently made by nothing.

This is the same class of leftover that project #19220 was opened to clear: a thing moved to the instructions repository and its reader in the code repository stayed behind. #19220 cleared `project-stub`; this is a second site nobody has taken.
