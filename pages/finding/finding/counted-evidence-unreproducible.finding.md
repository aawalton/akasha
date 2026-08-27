---
id: b07b0e61-a4e5-5912-92ad-ad8f5cee2178
page-type-slug: finding
title: "Counted evidence unreproducible"
domain-slug: page-type/finding
---

# Claim

A finding's numeric evidence records the figure but not the population it was taken over, so a later reader re-running it cannot separate an estate that moved from a method that differed, and reconstructing the original method is the larger part of re-measuring.

# Evidence

A finding against the `domain` domain, filed 2026-08-02 and deleted in the same pass that filed this one, recorded that 26 of the estate's 177 definition bullets carry a contrastive construction, and that the ratio had moved from 18/148.

What holds today, measured 2026-08-04 against `~/instructions`: extracting the `# Definition` section from every document carrying one under `domains/`, `roles/`, `tasks/`, `personas/`, `file-kinds/` and `folders/`, and excluding `dirty/`, which no `instructions-path` glob reaches, gives 175 documents of which 10 contain "rather than", ", never" or " not ".

The two figures are not one reading drifting into another. At `e107200f`, the last commit before 2026-08-03, that same extraction gives 9 of 166. Widening the text each pattern runs against to every line beginning `- **` anywhere in the file — which takes in Glossary, Principle and unit bullets alongside the Definition bullet — gives 26 of 166 at that same commit. So both figures describe the corpus as it stood, over different populations, and neither is available to a reader who has only the number.

Reconstructing which of the two a recorded figure was taken over was the larger part of re-running this evidence: three separate measurements against a historical checkout, where the record supplied the pattern but not the text it ran against.

`tools/document/schemas/finding.ts:28` says an Evidence section carries "the paths, the measurement, what was run", which is a comment on a schema rather than a surface anything reads before filing.

Not measured: how many findings now in the store carry a count, or whether any other is similarly unreproducible. Not measured: whether recording the population would have changed what any filing agent concluded.
