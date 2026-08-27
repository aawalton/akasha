---
page-type-slug: page-type
title: "Temper inventory chunk"
id: 019dbb6c-3e77-714c-ba14-b924a35fc725
extends-slug: page
files: akasha:**/*.temper-inventory-chunk.md
body-shape-slug: empty
named-for: "{inventory}-{chunk-index}"
owner-slug: account-page
slug: temper-inventory-chunk
plural-slug: temper-inventory-chunks
domain-parent-slug: domain/temper-account-item
---

# Definition

- **Temper inventory chunk** — one part of a snapshot's contents, sized so it can be carried in a single upload.

# Design

A chunk is named for the snapshot it belongs to and its place in that snapshot, so two imports in the same moment never contend for one name.

A chunk carries its payload as opaque text, which nothing here reads apart from the code that reassembles it.
