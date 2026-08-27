---
id: 45b274d6-0b7e-503d-b6c7-757a1d5ffa3f
slug: land-row-skips-ceiling
page-type-slug: finding
title: "landRow appends past the rows part ceiling"
domain-slug: domain/page-storage-rows-part
---

# Claim

A rows file `landRow` wrote stands past the 8MB part ceiling and was never divided. `pages/generation-log/alan.generation-log.runs.jsonl` is 16,240,118 bytes over 6,992 lines, nearly twice the bound, and is the only rows file in the repository over it.

# Evidence

`PART_CEILING_BYTES` is `8 * 1024 * 1024` at `page/rows-file.ts:4`. The rows writer keeps it: `appendable` at `tools/lib/page-rows-parts.ts:82` returns the last part only where `last.bytes + byteLength(line) + 1 <= PART_CEILING_BYTES`, and otherwise opens `rowsPartOf(basePath, partNumberOf(last.path) + 1)`.

`landRow` stands at `tools/lib/inference/generation-log.ts:27` and reaches `writeRow` from `@shared/pages-query`; `persist-image.ts`, `persist-audio.ts` and `inference-run-store.ts` under `tools/lib/inference/` are its importers.

The writer keeps the ceiling now. `alan.generation-log.runs.part2.jsonl` stands beside the oversized file at 231,316 bytes over 140 lines; part1's last row is dated 2026-08-17 and part2's run 2026-08-24 to 2026-08-25, so appends rolled to the new part and part1 stopped growing. What was never done is the division of part1, which is the half of the repair that is still open.

A sweep for rows files over the ceiling across the repository finds exactly one, that same file; the only other `.jsonl` over 8MB is `.git/pages/index/pages.jsonl`, which is an index rather than a page's rows.

The command that divided such a file, `split-rows-parts`, was removed at `a8a8bc1df`. It carried no page in any of the four namespaces it was invoked through. Alan ruled on removing it knowing this file stands over the bound, and deferred both halves of the repair.
