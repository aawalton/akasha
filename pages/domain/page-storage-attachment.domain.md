---
id: e7044439-5c86-51a2-962c-89bc9286937b
page-type-slug: domain
title: "Page storage attachment"
slug: page-storage-attachment
domain-parent-slug: domain/page-storage
---

# Definition

- **Page storage attachment** — a page property a page's files hold as a document of its own.

# Design

Every page is measured against a length its whole body must fit.

An attachment's value stands beside its page, named for it with `.md` replaced by `.<key>.attachment.<extension>`.

No gate that reads a page as prose reaches an attachment.

An attachment goes when its page goes.

An attachment is loaded only where it is asked for by name.
