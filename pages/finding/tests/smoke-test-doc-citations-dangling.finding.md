---
id: ee64f824-87dd-57a3-bd03-0c581dddbbc0
slug: smoke-test-doc-citations-dangling
page-type-slug: finding
title: "Smoke test doc citations dangling"
domain-slug: domain/global
---

# Claim

Seven live smoke-test files in the code repository cite a document called "Smoke Tests" that no longer exists in any repository, and five of the seven cite a second removed document, "Test Classification", in the same sentence.

# Evidence

Both documents stood under quarantine in the instructions repository and were removed on 2026-08-07 by two seats in one sweep: `dirty/docs/test-classification.md` at commit ad9cdd347 and `dirty/docs/smoke-tests.md` at commit 7bbb40e4. Every block of each was cut and nothing was kept from either, so there is no successor to repoint the citations at.

The seven citing files, all `*.smoke.test.ts`:

- `packages/media/audio-measurement/cli/src/audio-measurement/engines/smoke.smoke.test.ts:4-5`
- `.../engines/praat.smoke.test.ts:5`, `.../librosa_spectral.smoke.test.ts:6`, `.../embedding.smoke.test.ts:6`, `.../egemaps.smoke.test.ts:5`
- `packages/shared/pages/proc/src/page-create-if-absent-concurrency.smoke.test.ts:34`
- `packages/agents/devops-monitor/src/snapshot.smoke.test.ts:31`

The first five read "See Smoke Tests and Test Classification". The last two read "`[smoke skip]` is the canonical env-gate marker (Smoke Tests doc)", and those are where a reader loses something real: `packages/infra/checks/src/lib/test-classification.ts:132-139` lists `[smoke skip]` as one of five substrings that classify a file `smoke`, so the answer they wanted is in the analyzer rather than in any document.

How the seven were counted, because the count demonstrates a hazard of its own. `rg -n "Smoke Tests"` returns six files; a multiline pattern returns seven. The seventh is `smoke.smoke.test.ts`, where the phrase wraps across a line break with a comment marker inserted mid-phrase — line 4 ends "See Smoke", line 5 begins "// Tests and Test Classification." No line-oriented pattern reaches it. Anyone repairing these who greps the obvious string fixes six, leaves one, and reads the run as complete.

Filed at the removal: the instructions repository's `[mentions]` gate measures that repository, reported 0 stranded among the live documents, and no check spans the two.
