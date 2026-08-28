---
page-type-slug: finding
title: "An open record where the key set is known checks nothing"
domain-slug: domain/language-type-system
---

# Claim

An open record type states that its keys are arbitrary. Where they are not — where the set of
keys is settled and known at the moment the value is written — the type checks nothing about the
one claim the value is making, and a value naming keys that do not exist compiles exactly like one
naming keys that do.

The two uses are indistinguishable at a glance, because the type is the same type. What separates
them is whether the writer knew the key set, and nothing in the declaration records that.

# Evidence

`page/page.ts:3` declares `Roots` as `Readonly<Record<string, string | undefined>> & { readonly
target?: Repo }`.

TWO CALL SITES, ONE TYPE, OPPOSITE CASES.

At `tools/lib/seat-resolve.ts:56` the keys genuinely are arbitrary: `reposOf(type)` answers the
repository names a page type declares, which are not known when the file is compiled, and the
`undefined` arm one line below is doing real work. The openness is the truth there.

In `tools/lib/page-rows-resolve.test.ts` the fixture wrote `{ instructions: root, code: away,
memory: away, books: away, stories: away, "code-editor": away }`. That is a claim about which
repositories exist. Every one of those six had been absorbed into `akasha`, and the code under
test calls `rootFor(roots, AKASHA)`, so all four cases in the file threw `no \`akasha\` repository
is cloned here` before reaching an assertion. They had been failing since the repositories moved,
and the compiler had nothing to say about a literal naming six repositories that were gone.

WHAT DID NOT CATCH IT. `bunx tsc -b --force` at the root is exit 0, `tools/` being outside the 52
projects its `references` list reaches. `ops checks audit typecheck` reports the file clean, the
literal being well typed. Only running the test caught it, and only then by throwing rather than
by failing an assertion.

FOUND AT COMMIT `344f345ac`, which replaced the literal with `{ akasha: root }` and took the four
cases green.
