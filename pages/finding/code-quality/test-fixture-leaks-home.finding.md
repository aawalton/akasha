---
id: 6b6dd188-6859-5ec7-ae93-9bd015a50b80
page-type-slug: finding
title: "Test fixture leaks home"
domain-slug: domain/code-quality
---

# Claim

`tools/tests/corpus.ts` `fixture()` points `HOME` at a temp directory and a later test file in the same `bun test tools/` run still sees it, so `resolveRoots()` inside a test answers with roots under `/tmp/govtest-home-*` rather than the workstation's.

# Evidence

While building `tools/tests/bridge-calls-fit.test.ts` on 2026-08-11, a test needing the code repository's root read `${process.env.HOME}/code` and got `/tmp/govtest-home-c1Uokc/code`. The check under test then reported its probe as naming a package that resolves to nothing — its refusal for a real defect — while the same file passed on its own.

Printing `process.env.HOME` from inside the test body rather than at module load showed the same temp path, so this is not a load-order artifact: the value is still in place when a later file's tests run. `fixture()` restores `HOME` in `dispose()`, which points at a fixture somewhere in the suite that is not disposed, or is disposed after the files behind it have run.

The test now derives the code root beside the instructions root instead of from `HOME`, and says why. Any other test reaching for `resolveRoots()` or `$HOME` is exposed to the same, and what it would report is a real-looking failure about a missing file.
