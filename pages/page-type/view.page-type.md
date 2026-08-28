---
page-type-slug: page-type
title: "View"
id: 019db533-f381-7502-810c-92866a86d563
extends-slug: page
files: akasha:**/*.view.md
body-shape-slug: empty
slug: view
plural-slug: views
domain-parent-slug: package/shared-pages-ui
---

# Definition

- **View** — one arrangement of the pages of a type, as a person has set it up.

# Design

A view belongs to the nav item that owns it, and is drawn nowhere else.

A view names the page type it draws by slug, and its properties by the key each property definition states.

A view carries the order its properties are shown in, including the ones it hides.

A person edits a view from the interface that draws it, so its values are written by the browser rather than authored.

A cross-type view names a predicate instead of a page type, and draws pages of whatever types that predicate matches.
