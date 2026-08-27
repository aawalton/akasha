---
id: ebddced8-fa79-5694-814d-52ecbeee7e05
page-type-slug: finding
title: "Split coupling unmeasured"
domain-slug: domain/code-quality
---

# Claim

No registered mechanism measures inter-file coupling, so a file divided into pieces that refer to each other exactly as much as the original referred to itself clears `check-file-length` and appears in `git show --stat` as a genuine extraction.

# Evidence

Measured 2026-08-07 while ingesting `dirty/skills/code-quality/SKILL.md`.

`ops enforcement list` registers 177 check-steps. Scanning all of them for a coupling, cohesion, fan-out, import-count or dependency-volume measure returns nothing: the nearest are `check-acyclic-imports` and `check-acyclic-packages`, which measure cycles rather than volume, `check-layer-monotonicity`, which measures import direction, and `check-cli-json-contract-coupling`, which is about a CLI's JSON contract and not about files. Two files in one layer holding identical mutual references are acyclic and monotonic, so every one of them passes.

`check-file-length` measures characters per file, so two halves of a divided file pass whatever they import from each other.

Compression and division are told apart by `git show --stat`: one rewrites a file in place, the other creates a second path. A split relocating identical coupling creates a second path and shows insertions across both, so `--stat` reports it exactly as it reports a division along a real seam. Compression is caught this way; this is caught by nothing.

The source that prompted it stated the gap as "Identical coupling now crossing a file boundary is a compression wearing a split's clothes, and it passes every other check there is." The claim above is that sentence re-measured against the registry rather than taken from it.
