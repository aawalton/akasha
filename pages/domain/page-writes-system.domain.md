---
id: e3dcdb73-64cd-500b-a286-71e14cdd0284
page-type-slug: domain
title: "Page writes system"
slug: page-writes-system
domain-parent-slug: domain/pages-system
settled: true
---

# Definition

- **Page writes system** — how we change the things we keep track of.

# Design

A write makes a patch and changes nothing on disk.

A page write from a browser runs the same exported function on the server, so the guards inside it apply unchanged.

An app states its page writer once at boot, and every write it makes carries that name.

A value the write path cannot carry is named rather than dropped.

Taking a page away takes the files beside it.
