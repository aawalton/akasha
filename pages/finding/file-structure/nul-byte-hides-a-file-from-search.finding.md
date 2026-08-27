---
id: cbdd2de7-11ac-466e-97e7-ea6b3947a4a5
slug: nul-byte-hides-a-file-from-search
page-type-slug: finding
title: "A NUL byte hides a file from search"
domain-slug: domain/file-structure
---

# Claim

A source file holding a raw NUL byte reads as binary to ripgrep, so a search matches nothing inside it and says nothing about having skipped it. The file is present, tracked, and readable, and every search over it answers as though its contents were not there.

# Evidence

Re-measured 2026-08-27 in `/var/home/walton/repos/akasha`. `git ls-files -z | xargs -0 grep -laP '\x00'` names one tracked TypeScript file holding a raw NUL byte, every other hit being a PNG or ICO asset:

- `graph/ask.ts`, line 72

The byte is deliberate rather than corruption. It separates the parts of a key, written as a `\0` escape inside a template literal, so the source spells an escape and the file on disk carries the byte.

Demonstrated, both directions. `rg -l export graph/` returns 14 files. `rg -l --text export graph/` returns 15. The one only the second finds is `graph/ask.ts`, which holds `export` on 8 lines. The first run reports no skip, no warning and no count of what it declined to open.

It cost an agent time on 2026-08-24: it was debugging such a file, searched for a symbol in it, and the search answered with every other file while omitting the one it was reading. A search that is silently a no-match search over part of its own population, in a system where an agent starts cold and what search misses does not exist to it.

Picking a replacement separator carries its own risk, because whatever stands in for the NUL must not appear in an id or an owner name.

Not measured: whether any other repository holds such a file, and whether a verdict already reached rests on a search that skipped one.
