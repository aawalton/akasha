---
id: 083bb87c-eb6c-5e90-8dd4-b4586b96872c
page-type-slug: finding
title: "List bound stated in schema and body shape"
domain-slug: domain/pages-system
---

# Claim

Two documents state how many items a List section may hold, and neither names the other.
`tools/document/schemas/list.ts` states it as a cardinality on the bullet block, and
`page-body-shapes/list.md` states it as `repeat:` on the same block. Changing one and not
the other leaves a document that the schema admits and the page shape refuses.

# Evidence

Met on 2026-08-15 while emptying `domains/lists/disabled-hooks.md`. Changing
`tools/document/schemas/list.ts` from `items: { required: true, max: 1000 }` to
`required: false`, with the block's cardinality made optional beside it, made
`documents-conform` admit the empty body — measured in process against all four live list
documents, every one of which still conformed. The write was refused anyway, by
`page-holds-shape`: `1 part(s) outside the shape \`list\` states`. `page-body-shapes/list.md`
carried `repeat: 1-1000` for the same block, reached through `body-shape-id:
01a0006c-2ae9-7003-bca2-8a6ea154964c` on `page-types/list.md`. Setting it to `0-1000` was
the second edit, at commit `8c176946c`; the schema edit was `55760dadf`.

The pair is not visible from either side. Neither file names the other, and the schema
change passed every gate on its own landing — the disagreement only showed on the next
write of a document the pair governs. Nine other body shapes carry a `repeat:` bound
(`page-body-shapes/*.md`), and each of those page types also has a schema under
`tools/document/schemas/`, so the same pairing stands wherever both state a bound.
