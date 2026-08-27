---
id: 45b274d6-0b7e-503d-b6c7-757a1d5ffa3f
slug: land-row-skips-ceiling
page-type-slug: finding
title: "landRow appends past the rows part ceiling"
domain-slug: domain/page-storage-rows-part
---

# Claim

The inference code's `landRow` appends to a rows file without keeping the part ceiling, so a rows file it writes grows past 8MB with nothing beside it. `alan.runs.jsonl` stands at 15.5MB, nearly twice the bound.

# Evidence

`PART_CEILING_BYTES` is `8 * 1024 * 1024` at `tools/lib/rows-file.ts:4`. The rows writer keeps it: `appendable` at `tools/lib/page-rows-parts.ts:82` returns the last part only where `last.bytes + byteLength(line) + 1 <= PART_CEILING_BYTES`, and otherwise opens `rowsPartOf(basePath, partNumberOf(last.path) + 1)`.

`landRow` does not go through that path. `packages/infra/inference/src/generation-log` is imported by `persist-image.ts`, `persist-audio.ts` and `inference-run-store.ts` in the code repository, and by the mirrored copies under `tools/lib/inference/`.

A sweep for rows files over the ceiling across all four addressable repositories found exactly one: `pages/generation-log/alan.runs.jsonl` in the memory repository, 15.5MB, with no `.part2.jsonl` beside it.

The command that divided such a file, `split-rows-parts`, was removed at `a8a8bc1df`. It carried no page in any of the four namespaces it was invoked through. Alan ruled on removing it knowing this file stands over the bound, and deferred both halves of the repair.
