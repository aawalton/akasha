---
id: bb7d3f90-1b54-5190-a85a-87c244a4a6db
page-type-slug: finding
title: "Printer drops inline map"
domain-slug: domain/global
---

# Claim

`tools/document/print.ts` has no case for a frontmatter value written as an inline map, so
it prints the key and drops everything under it. Round-tripping a document through `parse`
and then `print` silently discards those contents rather than failing.

# Evidence

Measured 2026-08-13 by printing the parsed document and diffing the result against its own
source. `page-types/theme.md` declares

    properties:
      domain: { type: slug, required: true }
    sections:
      objective: { holds: 1-10 }
    slots:
      complete: { values: [x, " "] }
      statement: { max: 100 }
      description: { max: 200 }

and prints back as three bare keys with nothing under them. Every property, section and
slot the document declares is gone.

`tools/document/parse.test.ts` reports this as two failures naming `page-types/theme.md`,
one on the round trip and one on printing being settled after a single run. The document is
not the fault: it is the only live document in the corpus written in this shape, added in
`290530186`, and it is the first thing to reach the missing case.

What makes this more than a red check is that anything editing a document by parsing it and
printing it back writes the truncated version. The exposure today is one file, and it is the
file whose whole content is the declaration the printer discards.

Filed by amy while verifying project #18954, whose seat escalated the failing check as not
its own. Nothing in that project touches the instructions document tree.
