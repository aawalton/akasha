---
id: f361134f-0e97-5855-91e6-3c9f7a51fdb7
slug: title-file-keeps-trailing-newline
page-type-slug: finding
title: "Title file keeps trailing newline"
domain-slug: domain/ops-cli
---

# Claim

`--title-file` writes a file's trailing newline verbatim into `project.title`, a single-line field, unstripped; 17 non-deleted project rows currently carry that newline, each exactly one at the end with no internal breaks, and it silently corrupts any consumer that treats the field as one line — surfaced when `ops project list`'s headerless positional TSV emitted the raw newline inside a field and a 500-row window counted as 515.

# Evidence

From project #17049 (status `someday_maybe`, `live-on: deploy`, domain `ops-cli`), captured and never defined — no objective was ever written.

Measured: 17 non-deleted project rows carry a newline in `title`, each exactly one, at the end, none with an internal line break: seq 16830, 16829, 16826, 16824, 16822, 16808, 16807, 16806, 16792, 16789, 16786, 16779, 16778, 16777, 16776, 16713, 16694; `trailing_only = t, trailing_nl = 1, total_nl = 1` for all 17.

The mechanism: `title` is a single-line field. `--title-file` reads a file, and files end with a newline. Nothing trims, so the byte is stored.

How it surfaced: `ops project list`'s default output is a headerless positional TSV whose record separator is the newline it also emits raw inside a field. A consumer counting records by lines reads 515 for a 500-row window with no signal it did — fails in the quiet direction. Found by `project-16924` when `list.cli.test.ts` asserted 500 and received 515; the count matched the 15 affected rows in that window exactly, and a single-row reproduction confirmed the mechanism.

Why the fix is on write, not the render: changing the output format is a contract change to a surface whose consumers are unenumerated, and fixing consumers is one at a time forever. The value is malformed before anything renders it. Trim on write and the class stops existing.

Why this is a row, not a one-line fix: `--title-file` is one of several file-variant args, and more single-line fields than `title` exist. A trailing newline in `--notes-file` or `--body-file` is harmless; in any field a consumer treats as a line it is a latent version of this. First act: enumerate which file-variant args feed single-line fields, deciding one trim vs. a shared boundary. The 17 existing rows also need correcting, since a write-side fix leaves them — the second act is the one that gets forgotten.

Caution: trimming only the trailing newline is right; trimming all whitespace is a larger claim about what a title may contain, with no evidence for it here.
