---
id: 910bb1a8-ef9a-5136-bf3d-550b6ae7d777
slug: usage-not-a-disposition-filter
page-type-slug: finding
title: "Usage not a disposition filter"
domain-slug: domain/global
---

# Claim

Alan's ruling that **usage is not a filter** — it measures the past, while whether a
thing should exist is a question about the future — has no carrier in the live corpus.
The nearest is Parsimony on `pages/domain/global.domain.md:60`, "Compare the piece
against having none of it", which levies the existence check but says nothing
about what may answer it. A seat asked whether a piece should stay reaches for how
much it has been used, because a call-site count reads as measurement.

# Evidence

The ruling stood in a quarantined lead's ruling file being emptied line by line,
since removed with the tree that held it, among
three frame corrections Alan made to a disposition review: "**usage is NOT a filter**
(it measures the past while wantedness is about the future)". Its two siblings there
are already carried live — "DELETE is a third option" is Parsimony's "Compare the
piece against having none of it", and the thinness correction is
settled by `pages/page-type/domain.page-type.md:41`, "A slug and a definition is a whole domain, not a stub
waiting to be filled in". This one is not.

Searched 2026-08-07, with `rg -uuu` throughout because the shim respects `.gitignore`
and skips hidden files, and every verdict here rests on finding nothing.
`rg -uuu -n -i "usage|wanted|used before|how often it is used|past use"` over `domains/`
returns three lines, none of them this: a check name in a list, a `--if-not-exists`
filter shape, and a sentence of persona prose. Over the findings store,
`rg -uuu -n -i "usage is not a filter|measures the past|past use.{0,30}future|whether
it should exist"` returned one line, `pages/finding/project/obligation-opened-never-closed.finding.md:13`,
which says "The instrument settles what such a line would say and cannot settle
whether it should exist" — a different claim, about what an instrument can answer.

The corpus stood at 1162 findings when this was searched. Re-run 2026-08-27 in
`/var/home/walton/repos/akasha`, where the store is `pages/finding/` and holds 3294
findings: `rg -uuu -il 'usage is not a filter|measures the past' pages/` returns this
finding and nothing else, so the ruling still has no carrier.
