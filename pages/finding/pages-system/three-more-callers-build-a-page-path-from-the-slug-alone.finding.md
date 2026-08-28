---
id: effa212b-a0ee-4996-a6de-d55d9102a5cd
slug: three-more-callers-build-a-page-path-from-the-slug-alone
page-type-slug: finding
title: "Three more callers build a page path from the slug alone"
domain-slug: domain/pages-system
---

# Claim

Three callers besides `whereFor` compose a page's path as `pages/<slug>/...` without consulting where the page type says its pages stand. Two of them also drop the page type infix from the filename, so what they compose is not a page name at all: what makes a file a page is the page type its name carries. One of those two checks nothing before returning, so a caller cannot tell a real path from an invented one.

Filed rather than fixed, on the ruling that these are recorded now and repaired with whatever settles the `whereFor` case.

# Evidence

Read 2026-08-28.

`tools/lib/required-reading-manifest.ts:12-14` is the worst of the three:

```ts
export function termDomainPathIn(root: string, slug: string): string {
  return `${placeDirOf("domain")}/${slug}.md`
}
```

It takes a `root` and never uses it, so it cannot check that anything stands there. The `domain` page type states `akasha:**/*.domain.md`, and 19 of the 740 domain documents stand outside `pages/domain/`. The composed name also lacks the `.domain` infix: `pages/domain/global.md` does not exist, while `pages/domain/global.domain.md` does. So this answers a path that is wrong in two independent ways and says nothing about it.

`tools/lib/page-type-repo.ts:85` composes `` `${placeDirOf(parts.type)}/${parts.slug}.md` `` for any page type at all, dropping the infix the same way.

`ops-cli/worktree/start/start.command.code.attachment.ts:203` composes `` `${placeDirOf(PAGE_TYPE)}/${name}.${PAGE_TYPE}.md` `` and hands it to a write. This one keeps the infix and is correct today only because all `worktree` pages stand under `pages/worktree/` — it states no place of its own, so `pages/worktree/` is its default. It is wrong the moment that type states a place.

On `relPathFor` at `shared/pages-access/src/file-name.ts:58-64`, handed over as the same fault in a second function: it is not, and it is not live. Its `pages/${slug}/` branch fires only where `suffixOf` matched `**/*.<slug>.md`, a glob naming no directory, and for that case `pages/<slug>/` is the correct default rather than a hardcoding. Its actual defect is the other branch, which for a prefixed glob such as `agent/seat/**/*.seat.md` answers `agent/seat/<name>.md` and drops the `.seat` infix. That branch is asserted deliberately by `shared/pages-access/src/file-name-by-name.unit.test.ts:31`, which expects `relPathFor(BY_FOLDER, "lion")` to be `zoo/animals/lion.md`, and `nameFromAt` at `:83` depends on the round trip. No production code calls `relPathFor`: every reference outside its own file is one of those unit tests, and the `relPathFor` at `infra/cluster-checks/src/checks/check-repo-paths.ts:59` is an unrelated local function of the same name taking an absolute path.

Since measured, at `a2bd42e90`: `termDomainPathIn` has no caller at all. A repository-wide search, unrestricted by path or file type, returns its own definition at `tools/lib/required-reading-manifest.ts:12` and the two quotations of it on this page, and nothing else — the search reaching this page's own prose is the control on that zero. So the worst of the three composes a path wrong in two independent ways for nobody. That moves it off this claim and onto `pages/repo/akasha-repo.repo.md:23`, this repository contains no unused code: it should be deleted rather than repaired, and deleting it costs nothing that the other two cases need.
