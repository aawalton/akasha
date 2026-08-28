---
id: 01a046c4-1975-7bb0-a7a5-36c22a30c3e7
slug: a-landing-marks-the-whole-repository-it-did-not-index
page-type-slug: finding
title: "A landing marks the whole repository as indexed when it indexed only the pages it carried"
domain-slug: domain/pages-system
---

# Claim

`markLanded` (`page/index/build.ts:416-419`) writes a mark taken over every page in the repository after a landing has updated rows for only the pages it carried. A page changed on disk but not landed is folded into that mark, so `indexFreshFor` (`page/index/store/store.ts:235`) answers true while that page's row is stale. The strong guard can report current over rows that are not, and the two readers that fall back to a live scan on it then never fall back.

# Evidence

Read `build.ts:416-419`: `keepBuiltFrom({ ...held, [repo]: markFor(root) })`. `markFor` walks the whole root through `pageOidsIn` into `oidsUnder` (`repo/oid/oid.ts:51`), which is staged contents plus working-tree modifications rehashed live. A landing reaches it at `repo/land/landing.ts:89`, after `landHere` has applied only the landings it was given.

The comment at `landing.ts:81-88` weighs this call deliberately, but weighs a different risk: that two landings for different repositories drop one repository's mark. It does not weigh a mark that claims coverage of pages the landing never indexed.

A rebuild is not exposed the same way. `buildOver` (`build.ts:206-218`) takes its marks from the same `standing` oids walk that `missedDuring` is computed from, inside the index lock, so what it marks and what it indexed are the same reading.

Note also that `oidsUnder` never sees untracked files: `ls-files -s` reports staged entries and `diff-files` reports tracked modifications, so an untracked page file changes no mark at all and is invisible to both guards.

The condition is transient and self-clearing, which is why it is hard to catch. `staleIn(roots)` was reported to me as `["akasha"]` earlier tonight; when I ran it at 23:02 it returned `[]`, the index having been rewritten 36 seconds earlier by a landing at 23:01:56. Stored and live marks were equal.

I read this from the code and did not construct the false-fresh case to watch it fire.
