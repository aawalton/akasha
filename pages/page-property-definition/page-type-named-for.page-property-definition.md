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

A filled rule is a stem rather than a name: it is folded to lower case with every run of other characters becoming a dash, and bounded at 100 characters.

A rule with a hole it cannot fill produces no name.

A write whose rule fills to a name already there is refused, rather than that name taking a number.
