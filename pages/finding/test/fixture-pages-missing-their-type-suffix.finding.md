---
page-type-slug: finding
title: "Fixture pages missing their type suffix"
domain-slug: domain/test
---

# Claim

`tools/tests/page-closed-set.test.ts:67` and `tools/tests/page-record.test.ts:8` and `:18` name fixture pages `pages/page-property-type/verdict.md`, `mark.md` and `pin.md`, without the `.page-property-type.md` suffix that page type globs for. Those pages never enter the registry, the types they were written to declare do not exist, and eight tests across the two files fail. Two further tests pass off the same defect: they assert that `refusals` is empty, which a key nothing could judge satisfies as readily as a key that held.

# Evidence

Run on 2026-08-28: `bun test tools/tests/page-closed-set.test.ts tools/tests/page-record.test.ts` gives 11 pass, 8 fail, 19 tests. The failures are three of the five cases under `a set that is a type of its own, so several keys can name it` in `page-closed-set.test.ts`, and all five cases in `page-record.test.ts` that expect a refusal to name something. Each failed assertion received an empty string where it expected refusal text.

`pages/page-type/page-property-type.page-type.md:6` states `files: akasha:**/*.page-property-type.md`, and all 51 real pages under `pages/page-property-type/` carry that suffix. `verdict.md`, `mark.md` and `pin.md` do not, so no page type claims them and no type of those names exists for the fixtures to reference.

The two green ones are `page-closed-set.test.ts:81-84`, asserting `refusals` equals the empty list for `handle: keep` and `handle: drop`, and `page-closed-set.test.ts:100-105`, whose first assertion is the same. Both are satisfied by `verdict` being a type nothing states a rule for, which is exactly what an unregistered fixture produces, rather than by the closed set admitting the value. The second also asserts that `unjudged` names `verdict` as a type this states no rule for, and that assertion holds today for the wrong reason: the type is unknown because the file is misnamed, not because its `kind:` is `constant`.

The suffix alone would carry `page-closed-set.test.ts`. `page-record.test.ts` needs field declarations too: its fixtures state `type-slug` and `kind: record` and declare no fields for the record to hold.

The seat that measured this left both files alone, citing Delete Rather Than Repair in `pages/domain/test.domain.md`. Whether that rule reaches this case is not settled here: it governs a test that fails while nothing is wrong, and here the fixture is misnamed, which is something wrong in the test itself.

Not measured: I did not search the rest of the suite for other page fixtures named without their page type suffix, and I did not check what the eight tests would assert once the fixtures register.
