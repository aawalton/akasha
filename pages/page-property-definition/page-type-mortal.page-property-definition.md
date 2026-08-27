---
id: 8002e652-1d48-414d-86b3-2aaef94c5091
page-type-slug: page-property-definition
title: "Page type mortal"
defined-on-slug: page-type/page-type
key: mortal
type: boolean
default: false
slug: page-type-mortal
domain-parent-slug: page-type/page-type
---

# Definition

- **Page type mortal** — whether a page type's pages are expected to be deleted.

# Design

A deleted mortal page is never required reading.

A link with either end on a mortal page never refuses a write.

# Rules

## One-Way Citation

**Never name a particular mortal page from a page that outlives it.**

A mortal page is deleted the moment its purpose ends, and nothing naming it notices it go.

A path or an id names it as much as a title.

Name the folder or a glob instead.
