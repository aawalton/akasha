---
id: 516e24c8-1fb2-5ca8-9a21-6f647513984c
slug: pass-over-unjudged-sidecars
page-type-slug: finding
title: "Two gates return pass over secret and uncommitted files they do not judge"
domain-slug: page-type/gate
---

# Claim

Two gates return pass over files they do not judge. `words-read` reports `pass — 0 of 51 words` over sops ciphertext and over an uncommitted file; `token-ceiling` reports a byte count for the sops file. Both skip attachments and rows and neither skips secrets or uncommitted, so three of five sidecar kinds are judged as prose, against the statement in `domains/gate.md` that a gate which does not apply says so rather than passing quietly.

# Evidence

A delegate ran `tools/run-gates.ts` against one real file of each sidecar kind and reported the output quoted above; I read the skip lists at `tools/gates/words-read.ts:30-35` and `tools/gates/token-ceiling.ts:29-34` and confirmed both name exactly two kinds. I did not re-run the gates myself, so the quoted output is a report rather than my own reading.
