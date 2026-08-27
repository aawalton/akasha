---
id: 01a0458e-dfbd-7e39-a560-8b168478d6f4
page-type-slug: page-property-definition
title: "Mobile cut name"
defined-on-slug: page-type/mobile-cut
key: name
type: formula
returnType: text
narrows-slug: page
expression: '"{app-slug}-{text(build-number)}" ?? {slug} ?? {id}'
slug: mobile-cut-name
domain-parent-slug: page-type/mobile-cut
---

# Definition

- **Mobile cut name** — the app and the build number a mobile cut is addressed by.
