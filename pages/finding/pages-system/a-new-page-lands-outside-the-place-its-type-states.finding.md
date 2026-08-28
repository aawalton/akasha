---
id: c06e48ea-6374-405e-9b03-a2780fadbde6
slug: a-new-page-lands-outside-the-place-its-type-states
page-type-slug: finding
title: "A new page lands outside the place its type states"
domain-slug: domain/pages-system
---

# Claim

`whereFor` finds an existing page inside the place its page type states, and composes a new page's path from the page type's slug instead. The two lines sit two apart. Where a page type states a place other than `pages/<slug>/`, a page created through this path lands where that type says its pages do not stand, and the same function will never look there again: the write is not a duplicate but a page invisible to every later lookup.

Two of 393 page types state such a place, `seat` and `subagent`. Neither reaches this path today, each being written by a separate writer that hardcodes its directory, so the fault is latent rather than active. It becomes active the moment either type is written through the ordinary page write, or a third type states a place of its own.

# Evidence

Read 2026-08-27.

`tools/lib/page-write-where.ts:33` searches `scanIn(root, placesIn(type, repo), repo)`, so the search honours the stated place. `:34` composes `${placeDirOf(type.slug)}/${newPageNameFor(type, name)}`, and `placeDirOf` at `page/page-types.ts:188-190` is `` `${PAGES_ROOT}/${slug}` `` with `PAGES_ROOT = "pages"` at `:13`. It takes a slug and never sees the place.

Ran against the real tree: `whereFor(rootsHere(), "seat", "abby")` answers `agent/seat/abby.seat.md`, and `whereFor(rootsHere(), "seat", "no-such-seat-xyz")` answers `pages/seat/no-such-seat-xyz.seat.md`. `pages/page-type/seat.page-type.md:6` states `files: akasha:agent/seat/**/*.seat.md`. `git ls-files 'pages/seat/*'` is empty and `agent/seat/` holds the seats.

Compared every page type's stated place against `placeDirOf(slug)` over all 393 in the registry. Exactly two differ: `seat` states `agent/seat/**/*.seat.md`, `subagent` states `agent/subagent/**/*.subagent.md`. The other 391 state a location-free `akasha:**/*.<slug>.md` or `none`.

Seats and subagents are written by `tools/lib/seat-page.ts:27-29`, which builds its path from `SEAT_WRITE.dir`, a literal `agent/seat` at `tools/lib/agent-page-place.ts:9-19`. That literal is repeated in at least `agent/read-record.ts:8` and `editor-extension/src/seat/turn-color.ts:57`. Nothing derives it from the page type.

No rule in the repository says what directory a new page of a wildcarded place belongs in. `fixedPrefixOf` and `relPathFor` at `shared/pages-access/src/file-name.ts:43-64` slice a glob at its first wildcard segment, but they are reached only by a round-trip check at `:83` and one unit test, and for `agent/seat/**/*.seat.md` they answer `agent/seat/<name>.md`, dropping the `.seat` infix that makes a file a page at all.

Two tests state the opposite intent. `tools/tests/page-write-filed.test.ts:29,50` declares a probe type filed `code-editor:**/*.probe.md` and asserts the new page's path is `pages/probe/one.probe.md`. `tools/page/page-new-name.unit.test.ts:7` names the behaviour outright: "a new page is named for its page type, whatever its type says about where it is filed".

Not measured: whether the `pages/<slug>/` default is intended to stand for a wildcarded place and the fault is only the concrete-prefix case, or whether the default is itself the departure.
