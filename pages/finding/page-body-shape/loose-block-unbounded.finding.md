---
id: d05b4e4c-6928-5e55-941d-31904608bc18
page-type-slug: finding
title: "Loose block unbounded"
domain-slug: page-type/page-body-shape
---

# Claim

A paragraph standing in a section whose shape declares a list is accepted silently, so a body shape that writes only lists bounds nothing a writer sets loose beside them.

# Evidence

Measured against `page-body-shapes/theme.md`, whose `# Objective` section declares one bulleted list and no paragraph.

This body was put through `check(bodyOf(parse(text)), compiled, () => null)` and came back `{ ok: true }`:

    # Objective

    - A line of intent.

    Prose belonging to no objective.

`checkBlocks` in `tools/document/check.ts:90` splits the shape's parts into `proseParts` and list parts, and reaches the body's paragraphs only through the first. The overflow refusal at line 105 is guarded by `proseParts.length > 0`, so a shape declaring no paragraph has no arm that ever looks at one. Line 107 then walks the lists and never counts what stood beside them.

The same guard leaves the reverse case open: a shape declaring only paragraphs holds no list part, and line 107 iterates an empty set, so a list set loose in a paragraph section is reached by nothing either. That second half is read off the code rather than measured.

Nine of the 22 documents in `page-body-shapes/` write a list, and `theme.md` writes nothing else. That is what stands now; it says nothing about which pages carry loose prose today.

This was caught because `tools/tests/page-check.test.ts` held a case named "prose set loose in the section", which passed while the theme shape wrote its objective as a paragraph. The shape moved to a list at `8eaeb2bd0` and that case had to go, having become an assertion the checker no longer makes.
