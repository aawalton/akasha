---
id: ea5aeb81-4a00-57bd-baee-b9f13e6d215f
page-type-slug: finding
title: "Browser fixture leaks a persona row"
domain-slug: domain/global
---

# Claim

A browser-test fixture creates rows in the `persona` page type — a production page type — and they outlive the run. `ensureIdlePersonaRosterFixture` does a get-or-create scoped by `userId`, so it never finds Alan's `selah` and inserts its own, owned by the throwaway user and carrying nothing but a slug and a title. Nothing deletes it afterwards, so every reader of that page type sees a persona who is not one, and deleting the row by hand does not hold because the next run makes another.

# Evidence

Measured 2026-08-11. Two rows carry `slug: "selah"`. Alan's, created 2026-06-28, carries 49 fields. The other, created 2026-08-11T03:58:27.82Z, carries 14, of which only `slug` and `title` were written; its `userId` is the browser-test harness throwaway named at `packages/shared/supabase/auth/src/test-user-ids.ts`. All 41 genuine persona rows belong to Alan.

The creating call is `packages/shared/browser-test-harness/src/ensure-idle-persona-roster.ts:121`, a `createPageIfAbsent` whose `where` is `userId` and `slug` together. `selah` is a constant at `packages/alanwalton/web/idle-persona-roster-hydrated.browser.test.ts:71`.

IT RECURS, which is the part that matters. The `events` store reaches back seven days, to 2026-08-04. In that whole window exactly two rows were created in the `persona` page type: this fixture at 03:58:27Z on 2026-08-11 and the same fixture at 23:48:07Z on 2026-08-10. No genuine persona was created at all. An earlier one had been deleted by hand and came back.

THE COST IS NOT COSMETIC. `ops persona faucet apply` read the whole page type and planned `selah greenDayPoints undefined → 15` against the fixture — one `--write` from configuring a throwaway as a real persona. Every population figure the points instruments printed read 42 where 41 personas exist. #17051 made those instruments skip rows a disposable identity owns; that protects them and nothing else, so the leak itself stands.

WHAT I DID NOT ESTABLISH: which process ran the fixture at either time. A local `bun test` would look identical from here. `pages/finding/tests/browser-suite-drives-production.finding.md` left open what CI points `BROWSER_TEST_URL` at, and this does not close it.
