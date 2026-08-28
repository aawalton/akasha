---
page-type-slug: finding
title: "Well typed is not checked where the check lives in a guard"
domain-slug: domain/language-type-system
---

# Claim

A type can be entirely honest and still check nothing about the claim a value is actually making,
where what makes the value right is data rather than a compile-time fact.

Where that is so the check exists, but it exists somewhere else — in a guard — and a value built
without passing through that guard is well typed and wrong at the same time. Nothing distinguishes
it from a value that was checked.

# Evidence


`page/page.ts:3` declares `Roots` as `Readonly<Record<string, string | undefined>>` — open, and
correctly so. `repo/roots/roots.ts:87` sets `REPOS = namedOnDisk()`, scanning `*.repo.md` at module
load. Which repositories exist is data held in the pages, so no closed union could be written without
moving that fact out of the files and into the code.

THE GUARD ALREADY STANDS. `roots.ts:92` declares `isAddressable(value): value is Repo`, testing
membership in `REPOS`.

THE VALUE THAT DID NOT PASS THROUGH IT. `tools/lib/page-rows-resolve.test.ts` built its roots as
`{ instructions, code, memory, books, stories, "code-editor" }`. All six had been absorbed into
`akasha`. The code under test calls `rootFor(roots, AKASHA)`, so all four cases threw before reaching
an assertion, and had done since the repositories moved. The object was well typed throughout.

WHAT DID NOT CATCH IT. `bunx tsc -b --force` is exit 0, `tools/` being outside the 52 projects its
`references` list reaches. `ops checks audit typecheck` reports the file clean, the literal being
well typed. Only running the test caught it, and only by throwing rather than failing an assertion.

NARROWING THE TYPE IS THE WRONG REPAIR, and it is the one a reader reaches for first. A closed union
would catch this fixture by taking which repositories exist out of the pages, against
`pages/repo/akasha-repo.repo.md`. The repair is a guarded construction refusing an unaddressable key
where the value is built.

FOUND AT `344f345ac`, which replaced the literal with `{ akasha: root }` and took the four cases
green.
