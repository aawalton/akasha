---
id: ad18f7d1-a306-48c8-9326-762baaeecfcf
page-type-slug: initiative
slug: thea-checks-system
persona-slug: thea
domain-slug: domain/checks-system
parent-slug: aine-global
---

# Intent

- Every check is one somebody has read against what it guards, what that guarding is worth, and what it costs.
- A check runs on all changes that could break its invariant.
- Every file whose change could change a check's result is reachable from that check through the graph.
- The checks run before a worktree merges are those the change against main reaches, and no others.
- A check runs only on a change that could break its invariant.
- A check that can run on a patch passes before the patch is applied.
- Every occasion a check could run on is a property it states.
- A check's reach is worked out once and kept until what decides it changes.
- Every check akasha defines finds nothing on main.
- Which checks run is settled by their pages, never by a cache.
- Nothing outside the checks system says what a check is.

# Notes

Alan ruled on each of the following, on 2026-08-27 and 2026-08-28. They stand until he rules otherwise, and are here so nobody re-asks him or works against them.

**A check goes on for patches before main is clean.** An on-patch check judges only the files in the change, so a red main does not stop work that does not touch it. His condition, stated in those terms: a change set that does not touch a failing file must not be blocked by it. That condition holds for `typecheck` on four tests at `checks-system/check/typecheck/typecheck.on-checks.test.ts:61`, `:75`, `:89` and `:106` — a fault is reported where its file is in the change set or in an import cycle with one, and a file that merely imports what is judged, or is merely imported by it, is left to whoever touches it. A check whose scope is not bounded that way does not carry this licence.

**Checks are reviewed one page type at a time.** "No, review one at a time." What he rules for one page type is not carried across the rest.

**`folder-matches-a-shape` stays disabled.** "This is experimental, leave it disabled." 1,264 folders fail it on 2026-08-28, the repository root among them.

**Neither naming check is repointed at the computed `name` until Astra's naming migration lands.** `pages/page-property-definition/page-name.page-property-definition.md` declares `key: name` and `computed: true`, and `pages-system/name/name.ts` stands with its unit tests, but on 2026-08-28 109 page types still declare `named-for`, none declares a `name` formula, and nothing imports the resolver. Repointing before the expressions are in the new language takes `page-named-as-stated` and `page-name-unique` off every page type left behind: their failures fall, and what fell is judgment rather than fault. The resolver's default is `{slug} ?? {id}`, which demands uuid filenames of any page type whose pages carry no slug.

**A page's file stem is the page's name, and a folder names no part of a page.** That is where naming is going; it stands as Intent on the page-name property definition rather than as law. Royal Road chapters are the exception he drew: they keep their nesting, and renaming 17,902 of them to make 290 name collisions unique was weighed and refused.

**Judging an author is not a check.** Code that judges the writer belongs in `ops write` and `ops edit`, the only two commands that hold a write to what its author has read; code that judges the code stays a check. A subagent is judged through its seat's page, taking the persona, role and domain that page type declares as defaults, so a subagent that names none of the three is held to all three.

**Every code comment outside the code comment forms is deleted, not rehomed.** "If what they said matters, we'll add that back later." The rule is on `pages/domain/code-comment.domain.md`, and `no-code-comments` refuses on a patch.
