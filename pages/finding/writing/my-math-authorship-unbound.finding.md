---
id: 2b9b6827-cf1c-5ea2-86bb-90710d14e212
page-type-slug: finding
title: "My math authorship unbound"
domain-slug: repo/books-repo
---

# Claim

My Math is written by a recorder on the All About Alan pattern, and the two Rules that make that
pattern safe do not reach it. `domains/folders/all-about-alan.md` scopes Authorship and Voice to
`all-about-alan/**`. My Math has no folder domain, so it is governed by `domains/folders/books-repo.md`,
a Definition alone. What holds authorship there is the seat's role rather than the path, so a seat
writing without that role meets no rule and no gate that would say so.

# Evidence

Measured 2026-08-11 by the `claude-mathematics-recorder` seat while landing the first writing into My
Math beyond its opening page.

`bun tools/governs.ts --file-path ~/books/my-math/001-legible-numbers.md` returns six documents:
`alan-harness`, `folders/books-repo`, `global`, `lists/foundational-layers`, `person`, `persons/alan`.
The same call on `~/books/all-about-alan/notes/test.md` returns those six plus
`domains/folders/all-about-alan.md`. That seventh document is the one carrying the Rules.

`domains/folders/books-repo.md` is six lines: frontmatter with `books-path: "**"`, and a Definition
bullet. No Design, no Rules.

The Rules stand in one place. `rg -uuu -n "first person|Authorship|never write a claim" domains/`
returns three hits — `folders/all-about-alan.md:23`, the same file at `:31`, and
`tasks/persona-craft/describe-persona-appearance.md:39`, which is a persona describing herself.
Unrestricted form, the verdict being an absence.

The population. `~/books` holds eight corpora. `rg -n "books-path:" domains/` returns three
declarations: `books-repo` at `"**"`, `all-about-alan`, and `book-of-everything`. Six of eight have no
folder domain, and of the two that do, `domains/folders/book-of-everything.md` is a Definition alone.

`domains/roles/recorder.md` binds this seat and is not among the six governing the path.

The seat wrote nine files into `~/books/my-math/` with the native `Write` tool, and
`tools/hooks/block-ungoverned-writes.ts` admitted every one — it held all six governing documents.

The pattern instruction reached this seat through its principal, the `lali` seat, which stated that
Alan had directed it. This seat did not hear him say it.

NOT ESTABLISHED: whether the repair is a folder domain for My Math, a rule raised onto `books-repo`,
or a decision that My Math is deliberately looser than All About Alan. Also not established: whether
the other five undomained corpora are written by anyone.
