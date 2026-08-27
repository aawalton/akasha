---
id: ab20e258-e509-48ba-934c-e4bb027fb4f3
slug: a-write-finds-a-page-by-building-its-path
page-type-slug: finding
title: "A write finds a page by building its path"
domain-slug: domain/page-writes-system
---

# Claim

Every write surface addresses a page by name and turns that name into a path with `relPathFor`, so a write finds a page by constructing where it ought to stand rather than by asking what it is. Renaming a page type's pages cannot then be done in two steps: files before callers, or callers before files, each leaves the writer building a path no page occupies, and the write creates a second page there.

# Evidence

Read 2026-08-27.

`relPathFor` at `shared/pages-access/src/file-name.ts:67` answers `pages/{type}/{name}.{type}.md`. `nameFromAt` at `:75` takes a page's name from the last segment of its path. The two do not round trip: the name `abby/2026-06-11` lands `pages/persona-day/abby/2026-06-11.persona-day.md`, and that file reads back as `2026-06-11`. In the built index 2,022 persona-day pages stand under 91 names, and 123 idle-persona-card pages under 41.

Every write surface takes a page type and a name: `writePage`, `patchPage`, `patchPageIfMatch` and `removePage` at `shared/pages-query/src/index.ts:262`, `:273`, `:376` and `:478`; `patchPage` at `tools/lib/page-write.ts:109`; `patchPage` at `tools/lib/page-query-client.ts:163`. `writeUrl` at `shared/pages-query/src/index.ts:173` makes the name the URL path and keeps its slashes as segments.

`upsertFilePage` at `shared/pages-access/src/file-write.ts:335` does find a page by `where`, wherever it stands, but no caller reaches it: the file-write layer sits behind a service whose write routes are addressed by name.

Two callers show the cost. `tools/lib/daily-tracking/persona-day-points.ts:77` and `tools/lib/daily-tracking/points-source-rescore.ts:43` both build `${slug}/${dayStr}`, and the second rewrites arbitrary past days.

Not measured: whether any page type's pages have been renamed under this constraint before.
