---
id: c7d2b51d-0996-5edf-b734-517f93ebb17b
slug: strip-proof-blind-to-parsed-comments
page-type-slug: finding
title: "Strip proof blind to parsed comments"
domain-slug: domain/code-comment
---

# Claim

The strip's proof of sameness cannot see the loss of any comment the TypeScript compiler does not
read. It proves a file unchanged by transpiling it both ways and comparing; Bun's transpiler drops
comments, so a file that has lost a comment some other tool parses transpiles byte-identically and
the proof passes. Every case of this class found so far was found by something other than the proof.

# Evidence

Three cases, each caught by a different accident rather than by an instrument:

- `// ast-unused: keep` — twelve deleted across six files. Found by running `check-ast-unused` after
  the sweep had already committed. The check is not levied on a file write, so nothing refused it.
- A comment inside a `__fixtures__` file — two deleted. Found by a manager reading the diff. The
  area's suite passed both before and after, because a gutted fixture passes.
- `/** @noSelfInFile */` and `/// <reference path=... />` under `packages/temper` — found by a child
  scanning its own area and stopping at what it could not explain. Deleting the seven `@noSelfInFile`
  files takes that suite from 537 passing to 55 passing and 482 failing, and the lualib stops
  transpiling; the reference directives are what carry the ESO globals into the addon build.

What the three share is that the file still compiles, still transpiles identically, and in two of the
three the suite stays green. The thing that caught each was a person or an agent looking, which does
not scale across 427 packages.

The forms list is the right mechanism and it works, but it is a list of shapes somebody has already
been bitten by, and nothing enumerates what is still missing from it. The population is knowable: a
tool that parses comments has to read the file and match on comment syntax to do it.

Worth deciding: whether the strip should stop at a comment matching any known pragma marker rather
than only keeping a named form. `PRAGMA_MARKERS` in `tools/code-comment/forms.ts` already carries
most of these markers and already classifies such a comment as `candidate` rather than `prose` — and
the strip deletes `candidate` and `prose` alike, so the distinction it already draws costs nothing
and buys nothing.
