---
id: a0aa0397-e630-5253-8a43-f453690ce8f0
page-type-slug: check
title: "Read before write"
slug: read-before-write
needs: tree
needs-author: true
---

# Definition

- **Read before write** — fails a write whose author has not read what the change stands on.

# Design

A file not there yet has no body to have been read, and what it warrants is judged still.

A body a program moved counts as read everywhere else and is judged unread here.

Every warrant is judged once for the whole change rather than once for each file naming it.
