---
id: 14a66ed0-d57f-5d77-a93a-3829d4902317
slug: a-page-path-is-its-identity
page-type-slug: finding
title: "A file-backed page's path cannot change without the page changing, so that entry is in the wrong section"
domain-slug: domain/page-storage
---

# Claim

The Design entry at :19 -- "A file-backed page's path can change without the page changing" --
does not hold now, so under `domain-design` it is in the wrong section. Measured 2026-08-20 by
running the reader over the whole corpus.

# Evidence

`idOfFilePage` at `file-rows.ts:155` returns the stated `id:` or else `idDerivedFrom(at)`, a
uuid v5 over the string `<repo>:<relative path>`. For a page stating no `id:`, a `git mv`
re-identifies it.

Counted over all 310 file-backed page types carrying a glob, reading every matched `.md`:
**39,008 of 57,545 pages state no `id:`**, across 144 types, and on 133 of those not one page
states it. The figure moves with the corpus -- it was 38,994 of 57,525 earlier in the night.

A project document under `memory:projects/` stated no `id:`, and `getFilePages` returned
`16092fd7-7ac9-5ef3-8d40-866b8a3d58bb` for it, which is exactly `idDerivedFrom` over that
document's own `<repo>:<relative path>`. It has since been deleted with the project it carried.

`domain-intent` takes an entry naming a state the domain should be in and is not. That is what
:19 is, and the Intent entry at :37 -- "A file-backed page's id is in its frontmatter" -- is the
condition under which :19 becomes true again.

Two corrections to what is filed beside this. The proposed entry "A file-backed page whose
frontmatter states no id takes one derived from the path of the file it stands in" is **already
filed**, in this domain, in `design-lines-owed-on-file-backed-reads.md`. It should not go in
twice.

That same finding says the id defect was "Fixed at `file-narrow.ts:84,92`" by no longer pushing
an `id` narrow down to the query service. Read today, `narrowing` carries no `id` exclusion:
`27080bd973` -- "a lookup by id asks the query service again, now that the service settles a
derived id" -- reversed the approach. Run against `project`, a narrow on the derived id of a
page stating none returns that one row. The behaviour is right; the account of why is stale.
