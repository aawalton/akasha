---
page-type-slug: finding
title: "A tsx file is never a subject even when it is the file changed"
domain-slug: domain/checks-system
---

# Claim

A `.tsx` file is never a subject of the typecheck, on a gate or on an audit, even when it is the
file being changed. It is seen only as an import of a `.ts` root, so a fault standing in it is
reported by nothing.

The check states a reason for taking only `.ts`, and the reason it states is about which IMPORTERS
to re-report, not about whether a changed `.tsx` file should be judged at all.

# Evidence

`checks-system/check/typecheck/typecheck.check.code.attachment.ts:110`:

    const named = paths.filter((one) => one.endsWith(".ts")).map((one) => resolve(one))

`paths` is the changed set, so this is the SUBJECT filter. `.tsx` does not end with `.ts`, so no
`.tsx` file is ever a subject.

    tracked *.tsx                            880
    shared 369, temper 358, alanwalton 125, archive-of-worlds 11, smilingjenny 9, audhdalan 8
    of those, test files                     125

WHAT THE CHECK SAYS FOR ITSELF, at lines 95-98 of the same file: "ONLY `.ts`, WHICH IS THE
POPULATION THIS CHECK JUDGES. `subjects` is the changed `.ts` files, so a `.tsx` importer is in scope
and is not a subject on any run — an audit included. Carrying those would put 724 files on the gate
that no audit ever counts, and their lines can move under a change, which would have an
already-standing fault read as a new one."

THE STATED REASON COVERS A DIFFERENT CASE. It argues against re-reporting a fault in a `.tsx` file
that some OTHER change happened to touch the lines of — a real hazard, and `importersIn` at line 100
is where it belongs. It does not argue that a `.tsx` file should go unjudged when it is itself the
file being changed. The sentence asserts the population rather than defending it.

NOT RESOLVED HERE: the docblock says 724 and the tree holds 880 tracked `.tsx` files. The two may be
scoped differently or the number may have aged; nothing in this finding turns on which.

SO THIS IS NOT A BUG. It is a population that a reader would have to open this file to know about,
producing the same green as a `.tsx` file that was judged and found clean. Distinct from a project
skipped whole and from a file its project does not claim: those are configuration, this is the
check's own filter.

MEASURED 2026-08-28. Found by thea while mapping the typecheck's reach.
