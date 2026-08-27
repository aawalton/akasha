---
id: 019f14c3-27e4-7b72-bc0c-6e12bbd8577a
page-type-slug: page-type
title: "Image"
extends-slug: page
files: none
body-shape-slug: empty
slug: image
plural-slug: images
domain-parent-slug: domain/generation
---

# Definition

- **Image** — one picture the system holds.

# Design

An image's bytes stand in the object store under the image's own id, and on disk where the image says they were written.

An image records where its bytes stand, never the bytes.

An image made by a run names that run; one catalogued from disk names none.
