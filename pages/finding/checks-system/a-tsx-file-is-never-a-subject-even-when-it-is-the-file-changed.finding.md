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

`paths` is the changed set, so this is the SUBJECT filter, and `.tsx` does not end with `.ts`.
880 `.tsx` files are tracked: shared 369, temper 358, alanwalton 125, and 125 of the 880 are tests.

THE REASON THE FILE GIVES COVERS A DIFFERENT CASE. Lines 95-98 argue that carrying `.tsx` files would
put files on the gate no audit counts, and that their lines move under a change, so an
already-standing fault would read as a new one. That is a hazard of carrying a file caught up in
SOMEONE ELSE'S change, and `importersIn` at line 100 is where that rule lives. The same sentence
states in passing that a `.tsx` is not a subject on any run — it states it rather than defending it.
A file being changed and a file caught up in another change are different cases.

THE CHECK'S PAGE NAMES ONE EXCLUSION AND NOT THIS ONE. `typecheck.check.md` narrows nothing to `.ts`.
Its Definition is "fails TypeScript that does not compile under the settings its project declares".
Its Design says a file belongs to the nearest `tsconfig.json` above it, and that every file with none
above it belongs to the default project. Line 27 then states an exclusion outright: "A
`tsconfig.json` carrying another compiler's own key is that compiler's, and none of its files are
judged here." The page knows how to name an exclusion, names one, and is silent on `.tsx`.

The page also intends "No other route typechecks this repository", which stands under Intent — an
invariant that does not hold yet — so it shows direction rather than obligation.

Not resolved: the docblock says 724 where the tree holds 880. Nothing here turns on which.

Found by thea while mapping the typecheck's reach. Measured 2026-08-28.
