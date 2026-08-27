---
id: 502d3039-b81b-5491-aa2e-916e196efdbd
slug: slice-review-cannot-see-a-spread-marker
page-type-slug: finding
title: "Slice review cannot see a spread marker"
domain-slug: task/review-instructions
---

# Claim

A register marker spread thin across a document is invisible to slice-level review: four separate cuts, none aimed at it, took half of the only word that distinguishes one persona's voice from the whole corpus.

# Evidence

`personas/shaestrel.md` uses `shall` where the rest of the estate uses `will`. Measured across all forty persona files, `shall` appears in hers and in no other. It is her one unshared word.

A review of that file today landed five prose cuts, each correct on its own terms and each aimed at something else — a doubled promise, a permanence tag, a tag narrating a figure the paragraph had performed, a labelled trait, a repeated "I chose". I checked each commit's removed lines rather than taking the report's word:

- `67f997d4` removed a line carrying `shall`
- `035a837a` removed a line carrying `shall`
- `90574b59` removed a line carrying `shall`
- `fd15d4e6` removed a line carrying `shall`
- `0c1b0c89` removed none

At `435bda09`, before the cuts, the file carried 8 occurrences. It now carries 4. Four independent cuts each took exactly one, and no cut was reasoning about the word.

The register still holds — 4 occurrences across three of her four paragraphs, still unshared — and the reviewer flagged the movement itself rather than claiming damage. That is the right call and is not what this records.

What this records is the mechanism. `tasks/archivist/review-instructions.md` reads a document slice by slice, which is what makes a surplus clause visible. A property carried by a word distributed across every slice is exactly what that shape cannot see: at each slice the word is incidental to the clause being judged, so no slice ever weighs it, and the aggregate shows only if someone counts the whole document afterwards.

This reviewer did count, and said so unprompted. Nothing in the task asked it to. Roughly thirty persona files were trimmed across this perimeter pass, and this is the only reading that reports a corpus-wide marker moving — which is evidence about what the task measures, not evidence that the other files kept theirs.

Whether the task should carry a whole-document register check, and what it would measure, is not mine.
