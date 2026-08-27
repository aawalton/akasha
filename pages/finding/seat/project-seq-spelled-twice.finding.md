---
id: d8c56124-ae5e-5cae-ba17-7426e23377ed
slug: project-seq-spelled-twice
page-type-slug: finding
title: "Project seq spelled twice"
domain-slug: page-type/seat
---

# Claim

`domains/seat.md:15` spells an assignment two ways against the rest of the corpus. It reads "A seat's assignments are task, project-seq and initiative." The interface uses `seq` throughout — `--seq`, `--clear seq`, `--show`, `ops seat restate --seq`. The plural `project-seqs` is a live key on `tools/document/schemas/initiative.ts` and in `review-initiative.md`, but the singular `project-seq` stands only here. Under Ubiquitous Naming one of the two spellings should move.

# Evidence

Raised by a review-instructions seat on `domains/seat.md`, which reported that "project-seq appears nowhere else in the live repo".

I checked that and it is not quite right, so I am filing the corrected version. Grepping the live tree excluding `dirty/` returns three sites: `domains/seat.md:15` itself, `tools/document/schemas/initiative.ts:28` where the key is `project-seqs`, and `domains/tasks/lead/review-initiative.md:21` which names that same plural key. So the singular is unique to this line, but the term is not unprecedented — it is the singular of an existing key, which weakens the case for calling it a stray.

The reviewer noted which way to resolve it is judgment: `seq` alone is ambiguous, and `#<project-seq>` is the ops address form.

It raised a second, separate problem on the same line that I did not verify: `tools/seat.ts --help` states "THE SEQ IS AN ATTRIBUTE AND THE INITIATIVES ARE A RECORD", contradicting this line's bucketing on both counts. Its reading is that the help is stale against the attribute/assignment/property split, and that repair lands in the code repo rather than here.
