---
id: 636595b6-cdb1-5d48-9a39-79115ad99454
page-type-slug: finding
title: "Loose list in a prose-only section"
domain-slug: page-type/page-body-shape
---

# Claim

A list standing in a section whose shape declares only paragraphs is admitted silently. Lists are reached only through the parts that declare one, so a prose-only section has no arm that ever counts a list beside its paragraphs. Making the list side symmetric with the paragraph side would newly refuse 385 lists across 307 files that pass today, so what the checker admits and what the corpus writes disagree.

# Evidence

Measured 2026-08-28 on `main`.

`page/document/check.ts:113` refuses paragraphs beside the blocks a section declares, guarded by `parts.length > 0`. `:115` walks only the parts whose block is a list, so a section whose parts are all prose iterates an empty set and reaches no list.

Probed directly against the checker: a `# Tasks` section declaring one paragraph, given a body of one bullet and one paragraph, returns `{ ok: true }`.

The paragraph direction is bounded and stays so. `tools/page/document/check.test.ts:245-249` asserts `paragraphs — expected at most 0, measured 1` for a list-only section, and passes.

Swept the whole corpus through the compiler the gate itself uses, `shapeFor` at `page/shape/chain.ts:114` and `claimant` at `page/page-types.ts:326`, over 35,997 pages held to a compiled shape across 301 page types. 408 file-and-section pairs stand a list in a prose-only section, 385 of them in 307 files that pass the shape check today. No such section is matched by a second part that does declare a list.

Every offending section declares an unbounded repeat paragraph, which makes the take equal the paragraphs left at `:99`, so `:113` never fires. The largest groups are `finding` `# Evidence` at 229, `learn-everything-topic` `## Next bites` at 35, `task` `# Invariants` at 17 and `refusal` `# Refusal` at 16.

A fenced block and a table are unreached by the same asymmetry. Not measured.

Whether these shapes should declare a list or these bodies should stop writing one is not settled here.
