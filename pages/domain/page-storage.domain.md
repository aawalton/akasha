---
id: c00b3973-f468-5e41-96a3-fe02922e26d0
page-type-slug: domain
title: "Page storage"
slug: page-storage
domain-parent-slug: page-type/page-type
---

# Definition

- **Page storage** — pages kept as files in a git repo.

# Design

Reading a page needs nothing but its repo.

A page's repo is on the workstation.

A page's path can change without the page changing.

Both sides of a relation between pages land in one commit.

A page's history is its repo's history.

A page has one kind of deletion, and it removes the file.

A page's body property is the file's body.

A computed property is not in a page's file.

No file beside a page is named `.md`.

A row has no file of its own, so no property of a row is secret, uncommitted or an attachment.

# Intent

Parsing a page's file and writing it back leaves the file unchanged.

A page's id is in its frontmatter, or among a row's keys.

The page a relation names is found by what the files say, not by what they are called.

A written property is in a page's frontmatter unless it is the body, a secret, or uncommitted.
