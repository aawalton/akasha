---
id: 57f44186-1938-59d2-910b-75183f27ecd1
page-type-slug: finding
title: "A removal gate typechecks one file of the set it is given"
domain-slug: repo/akasha-repo
---

# Claim

A removal gate that typechecks one file at a time passes on a set whose members
cover each other's importers.

# Evidence

Observed on a removal gate handed a set of modules and their tests in one call. It
printed a typecheck pass whose own sentence read "this file, all that imports it,
and all those need" — singular, against a set — and wrote the removal. A corpus
typecheck run immediately afterwards reported a surviving module that could no
longer resolve one of the removed files.

That importer was never in the removal set, so an importer scan run over the set
would have named it. The reach the gate reported was the reach of one member rather
than of all of them.

The same command had already taken a smaller removal in the same session and passed
with the corpus staying green, so the gate was not simply inert: it answered about
one member and printed the answer as the set's.

Nothing about the missing importer was unusual. It sat beside the module it named
and imported it as `./module.ts` rather than by any path carrying a directory word.
A hand search for importers written with a directory prefix misses every sibling,
which is exactly the search the gate exists to replace.

A removal that leaves the corpus not typechecking is caught by nothing else before
it lands: the removal commits on its own verdict, and a corpus typecheck is a
separate call somebody has to think to make.
