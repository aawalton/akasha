---
id: a564db11-45c4-5fe7-ad3e-4ecf7a60dc04
page-type-slug: finding
title: "Scratch in tmpfs"
domain-slug: domain/global
---

# Claim

Twenty-six files under `tools/` put their throwaway files in the platform temp directory, which on this workstation is `/tmp` — tmpfs, and so RAM the whole fleet shares. Scratch Location on `domains/agent-harness.md` names `/var/tmp` instead.

# Evidence

`grep -rc "tmpdir()" tools/` reports 38 occurrences across 26 files, on 2026-08-10. Three of them are `tools/tests/corpus.ts`, whose `fixture()` mints an instructions root, a memory root and a home for every gate suite that needs one, so a single `bun test tools/` run creates them many times over. The rest are individual suites and two gates, `typecheck.ts` and `document-conforms.ts`, which materialize a tree to judge against.

Noticed while converting gate refusals to the corpus, which touched `corpus.ts` for another reason. Fixing three of the thirty-eight in that landing would have left the tree half-converted with nothing saying why, so none were: this is one sweep or none.
