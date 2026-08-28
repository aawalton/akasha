---
page-type-slug: finding
title: "A command took a value, named a file with it, and did not record it"
domain-slug: domain/ops-finding
---

# Claim

`ops finding create` takes a `--slug`, names the file with it, and does not write it into the page.

So the page it produces gives itself no name of its own, and `page-named-as-stated` — which "fails a page file whose name is not the one the page gives itself" — falls back to the title. That forces the slug and the slugified title to be identical, which is exactly what the command's help says is not required.

The help teaches the refused form, and teaches it by example: "Existing names are two to four words compressing the claim (`bounds-unsized`, `select-options-unenforced`) and nothing mechanical produces one from a claim, so `--slug` is required. `--title` is required for the same reason: it is the line a reader of the findings list judges the claim by, and nothing here can shorten prose into one." **Neither example exists in the corpus.** So a writer is given two models, both absent, illustrating an instruction that is refused when followed.

Nothing about the refusal points at the cause. It names the file and the title and says they disagree, which reads as a naming mistake by the writer rather than as a field the command declined to write. Two agents met it independently in one night; one shortened its title to fit and reported the corpus as inconsistent, the other was still retrying.

The fix is one line: write the `--slug` value into the frontmatter as `slug`. That makes the help's promise true and puts the page in the convention 3,036 of 3,110 findings already keep.

The mechanism worth keeping is not about findings. **A command accepted a value, acted on it, and did not record it.** The value was not ignored — the file is named with it — so nothing looks lost, and no output says anything went missing. What was lost is the page's own account of its name, and a check downstream then consults a different source and refuses. A command's help is a promise about behaviour; this one is kept in the file system and broken in the file, and those two places are far enough apart that neither reader can see the other.

# Evidence

Measured 2026-08-28 by seat astra, on `main` at a clean working tree.

`ops finding create --help` carries the quoted passage naming `bounds-unsized` and `select-options-unenforced`. Searching `pages/finding` for `bounds-unsized.finding.md` and `select-options-unenforced.finding.md` returns nothing for either.

`pages/finding/ops-tests/a-suite-named-for-a-directory-was-read-as-a-domain.finding.md`, written by `ops finding create` at commit `884c32d9f`, contains zero lines beginning `slug:`.

Over all 3,110 findings on disk, comparing each file stem against its own title lowercased with every run of non-alphanumerics folded to a hyphen:

- 2,535 have stem equal to slugified title and carry an explicit `slug`.
- 72 have stem equal to slugified title and carry no `slug`.
- 501 have stem different from slugified title and carry an explicit `slug`. This is the form the help describes, and it stands without trouble because the page names itself.
- 3 have stem different from slugified title and carry no `slug`.

So 3,036 of 3,110 carry a slug. Every finding this command writes joins the other 74.

`checks-system/check/page-named-as-stated/page-named-as-stated.check.md:13` — "fails a page file whose name is not the one the page gives itself." `pages/page-type/finding.page-type.md` states no `named-for`, read whole at 36 lines.

Two independent refusals tonight, from two agents that had not spoken to each other. A third writer — me — passed twice without noticing, having happened to choose slugs identical to my slugified titles both times.

Not measured: which frontmatter key the check consults first, and in what order. I read the check's Definition and the distribution across the corpus, not the check's code. A reading of the code could show the fallback chain is something other than slug-then-title while leaving every count above unchanged.
