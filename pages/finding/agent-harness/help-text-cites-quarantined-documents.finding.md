---
id: b334c33b-0256-5529-af7e-8fd27f2bfe88
page-type-slug: finding
title: "Help text cites quarantined documents"
domain-slug: domain/agent-harness
---

# Claim

Ten `ops` help texts cite six documents that the 2026-08-03 quarantine moved out of the code repository, so a reader following any of them from a live CLI is sent to a path that has not existed since.

# Evidence

Measured 2026-08-04 by running `check-emitted-path-citations` after repointing its own canary in `296110d449`; the ten are what the check reports once it can see again.

The cited paths are `docs/claude-code-system-prompt.md` (three times, from the help of a command since retired), `packages/infra/ci/cli/docs/pipeline-cutover.md` (three, from `ops pipeline disable|enable|reset`), and one each from `ops k8s synth`, `ops music listening`, `ops migration baseline-rebuild` and `ops query-perf triage`.

They share one cause. Commit `7205e28efd` on 2026-08-03 deleted 1,125 instruction files, 93,245 lines, from the code repository into `instructions/dirty/`. The help text naming them was not part of that sweep, so each verb still describes where its documentation was rather than where it went — and unlike a stale link in prose, this text is emitted by a live command a person is running at the moment they are told to go read it.

The check reports `[POPULATION NOT DECLARED]` alongside the count, so the ten are a floor rather than a census: nothing here establishes that generated CLI output is the only carrier that went stale in that sweep.

Not measured: whether the six documents survive in `dirty/` in a form worth citing at all, which decides per verb whether the fix is a repoint or a deletion of the sentence.
