---
id: 01a04615-305e-763d-b28f-bedf12d64461
page-type-slug: all-about-alan-topic
title: "Why I Keep My Data In Files"
slug: why-i-keep-my-data-in-files
topic-parents-slugs: the-scaffolding-i-built
topic-related-slugs:
  - why-i-rebuilt-everything
  - what-i-gave-up-leaving-postgres
  - what-i-invented-and-what-i-read
---

# Definition

- **Why I Keep My Data In Files** — why my context lives in files an agent can grep rather than in a database

# Design

A database assumes you know exactly what you are looking for.

A file system with grep assumes you do not know exactly what you are looking for, which is a much better fit for this case.

I built a fully file-backed database from scratch and did a lift and shift of about three hundred tables out of Postgres into it.

All that context is now just a grep away.

# Questions

Whether the win is grep itself or the shape I gave the files is not separated.
