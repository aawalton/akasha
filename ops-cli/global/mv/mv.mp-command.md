---
id: e3dd9f3b-fb1a-44bc-9658-5b8ea2ba4f99
page-type-slug: mp-command
title: "Mv"
slug: mv
path: mv
domain-parent-slug: domain/ops-global
required-reading-slugs:
  - page-type/mp-command
---

# Definition

- **Mv** — files carried to new paths, with everything naming them repointed in the same act.

# Design

A move repoints a relative specifier only; one naming a package, a workspace or a tsconfig path alias is left alone.

A page's sidecars go with it without being named.

A move between repositories is one act and two commits, the destination taking the bodies before the source gives them up.

A move repoints an importer in whatever repository holds it, and commits it there.

A repointed importer lands before either repository exchanging bodies.
