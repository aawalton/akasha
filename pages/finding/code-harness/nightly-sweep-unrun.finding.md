---
id: f8ba8015-bcf3-549d-bdfd-4121bee21231
slug: nightly-sweep-unrun
page-type-slug: finding
title: "Nightly sweep unrun"
domain-slug: domain/global
---

# Claim

The nightly slow-suite sweep has not run since the stale-project sweep removal landed, so that removal's effect on the suites branch CI does not select is unmeasured.

# Evidence

Project #18947 removed the stale-project detector package, two pages-access query
files, a database table and every reference outside three deliberate sites. Its other
seven criteria were verified at lead handback: `rg -i 'stale.?project'` returns exactly
three files and thirteen matches, all of them the retired-subscriber entry, the
work-surfacing floor comment and the frozen queue-reachability baseline; both query
files and the package directory are absent; `public.event_subscribers` holds no
`stale-project-detector` row; `to_regclass('public.stale_project_notified_episodes')`
returns null; and the worker is absent from the discovered fleet.

Branch CI passed all 123 steps at `b8821fb1a4`, and its slow-suite gate covered the 34
suites the diff selected. The nightly sweep covers the suites that gate does not select
and keeps its own schedule, having not run between the deploy at `8bc4758c6d28` and this
verification on the same day. Nothing about the change predicts a failure there; the
point is that no run has reported either way.
