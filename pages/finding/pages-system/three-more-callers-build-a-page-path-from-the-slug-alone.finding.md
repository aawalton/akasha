---
id: effa212b-a0ee-4996-a6de-d55d9102a5cd
slug: three-more-callers-build-a-page-path-from-the-slug-alone
page-type-slug: finding
title: "Three more callers build a page path from the slug alone"
domain-slug: domain/pages-system
---

# Claim

Three callers besides `whereFor` compose a page's path as `pages/<slug>/...` without consulting where the page type says its pages stand, and two of them drop the page type infix from the filename.

# Evidence

Read 2026-08-28.

`tools/lib/required-reading-manifest.ts:12-14` was the worst of the three:

```ts
export function termDomainPathIn(root: string, slug: string): string {
  return `${placeDirOf("domain")}/${slug}.md`
}
```

It takes a `root` and never uses it, so it cannot check that anything stands there. The `domain` page type states `akasha:**/*.domain.md`, and 19 of the 740 domain documents stand outside `pages/domain/`. The composed name also lacks the `.domain` infix: `pages/domain/global.md` does not exist, while `pages/domain/global.domain.md` does. It had no caller — a repository-wide search returned its own definition and this page's quotations of it and nothing else — so it was deleted at `d0c31e79`, 2026-08-28, with the dead `export type { Manifest }` re-export beside it.

Two callers remain and hold this finding open. `tools/lib/page-type-repo.ts:85` composes `` `${placeDirOf(parts.type)}/${parts.slug}.md` `` for any page type, dropping the infix the same way; it is `placedElsewhere`. `ops-cli/worktree/start/start.command.code.attachment.ts:203` composes `` `${placeDirOf(PAGE_TYPE)}/${name}.${PAGE_TYPE}.md` `` and hands it to a write; it keeps the infix and is right only while the `worktree` type states no place of its own, so `pages/worktree/` is its default.

`relPathFor` at `shared/pages-access/src/file-name.ts:58-64` is not this fault: its `pages/${slug}/` branch fires only where `suffixOf` matched `**/*.<slug>.md`, a glob naming no directory, for which `pages/<slug>/` is the correct default. Its actual defect is the other branch, which drops the `.seat` infix, asserted deliberately by `shared/pages-access/src/file-name-by-name.unit.test.ts:31` expecting `relPathFor(BY_FOLDER, "lion")` to be `zoo/animals/lion.md`; that branch stands as `prefixed-globs-have-no-pages-directory`. No production code calls `relPathFor`: every reference outside its own file is one of its unit tests, and the `relPathFor` at `infra/cluster-checks/src/checks/check-repo-paths.ts:59` is an unrelated local function of the same name taking an absolute path.
