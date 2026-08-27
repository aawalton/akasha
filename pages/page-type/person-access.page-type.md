---
page-type-slug: page-type
title: "Person access"
id: 019febe3-8309-7487-bb77-8b2dd4229fd1
extends-slug: page
files: instructions:**/*.person-access.md
body-shape-slug: empty
named-for: "{person-slug}-{access-kind}-{target}"
slug: person-access
plural-slug: person-accesses
domain-parent-slug: domain/person-harness
settled: true
---

# Definition

- **Person access** — what a person may reach in the system.

# Design

Each kind of thing a person may reach stands as its own domain beneath this one.

An access grants one kind of reach over one target, and a person holding several holds several pages.

A target of `all` is every target of that kind, and is the only pattern an access takes.

Access to a page type does not carry access to the routes that serve it, or to the rows beneath it.

# Intent

Every access a person holds is a page, and every refusal of access is a read of those pages.
