---
id: 0292847e-ecb7-5f31-9567-4873b44cc060
slug: part-files-escape-judgment
page-type-slug: finding
title: "The rows-file pattern mis-parses a part file, so rows past the split are never judged"
domain-slug: domain/page-storage-rows
---

# Claim

The pattern that recognises a rows file, `/^(.*)\.([a-z0-9-]+)\.jsonl$/` at `tools/gates/page-holds-properties.ts:19`, is greedy and mis-parses a part file. Against `aine.reward-concepts.part2.jsonl` it yields the parent `aine.reward-concepts.md` and the key `part2`, which no page type claims, so the gate skips. Every row past the split ceiling is therefore never checked against the property set. `tools/lib/rows-file.ts:6` already carries a pattern that recognises a part.

# Evidence

A delegate ran the regex against that filename and reported the parse; I read the constant and confirmed `tools/lib/rows-file.ts` carries both the part pattern and the 8 MiB ceiling. No part file exists in any repo today, so nothing is escaping judgment right now — the defect arms itself the first time a rows property grows past the ceiling. I did not run the gate.
