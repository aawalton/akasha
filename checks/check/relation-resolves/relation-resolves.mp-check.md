---
id: 7b05db85-fa23-5d2e-bb7c-02ffa67455ea
page-type-slug: mp-check
title: "Relation resolves"
slug: relation-resolves
needs: tree
---

# Definition

- **Relation resolves** — fails a removal after which a page relation names nothing.

# Design

The tree judged is the one the change would leave, so a page it removes and a page it adds both count.

A relation whose property is marked `may-be-gone` is outside this check.

Only pages in this repository are read for the relations they carry.

A relation naming nothing before the change is not reported, no page going being what bore its value.
