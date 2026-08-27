---
page-type-slug: page-property-definition
title: "Page type named for"
id: 01a00827-1d21-7000-821f-95a9949d3e01
defined-on-slug: page-type/page-type
key: named-for
type: template
default: "{slug}"
slug: page-type-named-for
domain-parent-slug: page-type/page-type
---

# Definition

- **Page type named for** — the rule a page type gives for producing a page's name.

# Design

Each hole names a key the page carries.

A page type takes the nearest rule its `extends-slug` chain states.

A write that states a name or a slug is addressing one page, so the rule is read only where it states neither.

A filled rule is a stem rather than a name: it is folded to lower case with every run of other characters becoming a dash, bounded at 71 characters, and a second page the rule names the same takes `-2`, then `-3`.

A page whose rule leaves a hole unfilled is named `untitled`.
