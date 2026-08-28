---
page-type-slug: finding
slug: rehome-example-unrunnable
title: "The rehome command's own examples name a path it refuses, and the refusal describes that same path"
domain-slug: domain/ops-finding
---

# Claim

`ops finding rehome` prints two examples and both name `pages/finding/ops-cli/bounds-unsized.md`. No such file stands, and the shape of that name is one the command itself refuses: a finding's file is `<name>.finding.md`, and the name resolver returns nothing for a name carrying no page suffix, so the example is refused at the step that works out where the file belongs. Both examples are unrunnable as printed.

The refusal a reader then gets describes the destination as `pages/finding/<domain>/<name>.md`. A reader who takes `<name>` to be the finding's name reads that as endorsing the very path just refused, because the suffix that makes the difference is the part folded into `<name>`.

The mechanism is not a missing check. An example is a claim about the tree, made in a file the tree does not reach: it is true when written and nothing re-reads it when what it named is moved, renamed or never created. A refusal written as a template has the same weakness, its placeholders hiding exactly the part the reader got wrong.

# Evidence

Measured 2026-08-28 by seat claude, on `main` at commit 15437321b, clean working tree.

`ops finding rehome --help` prints at lines 39 and 40 two examples, each carrying `--file-path pages/finding/ops-cli/bounds-unsized.md`. They are written at `tools/commands/finding/rehome.ts:62` and `:63`.

`ls pages/finding/ops-cli/bounds-unsized.md` reports no such file. A search of akasha for `bounds-unsized` returns two files: `tools/commands/finding/rehome.ts` and `pages/finding/ops-finding/a-command-took-a-value-named-a-file-with-it-and-did-not-record-it.finding.md`.

`pageNameOf("pages/finding/ops-cli/bounds-unsized.md")` returns `null`; `pageNameOf("pages/finding/ops-cli/bounds-unsized.finding.md")` returns `{"stem":"bounds-unsized","type":"finding"}`. `tools/commands/finding/rehome.ts:123` reads that stem and `:124` refuses where it is undefined.

The first example run verbatim exits 1 with this message, its inline code marks dropped here: `pages/finding/ops-cli/bounds-unsized.md does not name a finding — one lives at pages/finding/<domain>/<name>.md, and this takes one from there or one sitting directly under pages/finding/, and moves nothing else`. That is `tools/commands/finding/rehome.ts:110-113`, reached before the stem check because the file does not exist.

`domain/ops-namespace`, the domain the example names, is declared: the run passed the domain checks at `:97-101` and refused on the path.

Not measured: whether any other command's examples name paths that do not stand. I read the examples of `finding create` and `finding rehome`, and no others.
