---
page-type-slug: page-type
title: "Nav"
id: 019db533-f381-74aa-8363-2a37359492e8
extends-slug: page
files: instructions:**/*.nav.md
body-shape-slug: empty
slug: nav
plural-slug: navs
domain-parent-slug: package/shared-pages-ui
---

# Definition

- **Nav** — one item in an app's navigation, and the views beneath it.

# Design

A nav item belongs to one app, and an app's navigation is every nav item naming it.

A nav item names another as its parent, so navigation is one level deep or two.

A nav item carries the order it sits in among its siblings.

A person reorders and renames nav items from the interface that draws them, so their values are written by the browser rather than authored.

A nav item a product must find again carries a marker key holding a constant that product names.

# Intent

A nav item is found by slug rather than by a marker key holding a constant.
