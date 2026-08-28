---
id: 3c70265d-07aa-581f-9431-0ceab4d42aaf
slug: four-baselines-one-word
page-type-slug: finding
title: "Four baselines one word"
domain-slug: domain/old-check
---

# Claim

The code discriminates four kinds of committed baseline a check compares the tree against, and no document declares any of them. `ratchet` is the sharpest: it appears 17 or 18 times in each of the three checks holding a shrink-only list of accepted violations, and zero times in the three that hold a census or a derived artifact. One prose use stands, unglossed, and `domains/code-check.md` declares no `glossary:` at all.

# Evidence

Measured 2026-08-08 against `~/code` at `4799485a23`.

    check                          "ratchet"  its own word
    check-liveness-routing                17  ratchet
    check-prose-mechanism-restatement     17  ratchet
    check-cli-help-flag-references        18  ratchet
    check-liveness-census                  0  census
    check-liveness-subject                 0  census
    check-tstl-plugin-emit-fresh           0  emitted artifact
    check-tstl-colon-dot-self-shift        0  grandfather baseline

The three that use it hold a shrink-only list of accepted violations and refuse to widen. Shrink-only is incoherent for a census, which stops being a census of its population the moment the population grows.

`check-seat-resume-driver.ts:13` spends a docblock heading holding the line — "WHY THIS IS NOT A RATCHET" — and states the crispest definition in the estate: "A ratchet says the population did not grow."

The three compliers share no implementation. Each carried its own exported `applyRatchet`/`nextRatchet` pair. Two of the three stand here: `tools/lib/check-workflow/prose-mechanism-restatement.ts:124,144` behind `infra/cluster-checks/src/checks/check-prose-mechanism-restatement.ts`, and `tools/lib/cli-help-flag-references.ts:213,230` behind `tools/audits/cli-help-flag-references.ts`, each with its own `.ratchet.json` baseline beside it. The `liveness-routing` one stands in no tree here. Independent constructions converged on the same refusal.

Against that, nothing is declared. `ops akasha dag` returns no slug matching `ratchet`, and no `# Definition` bullet anywhere under `pages/` defines it. There were 228 non-test uses across the code repo, reaching well past the checks tree.

`pages/domain/global.domain.md` § Plain Or Declared governs this, and `jargon` forecloses the defence: "A word the code spells is jargon on the same test as any other." That page now stands at `pages/barred-meaning/jargon.barred-meaning.md` and no longer carries the quoted line.

The cost is measurable. A rule candidate drawn against ratchets had its population set at ten, then six, then four, each correction the same one — prose reading the word onto artifacts whose source never claims it. An ordinary verb sense also stands and does not collide: `ceri-points.worker.ts:21`, "`totalPoints` only ever ratchets up."
