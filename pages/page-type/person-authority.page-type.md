---
page-type-slug: page-type
title: "Person authority"
id: 019fecb6-e112-7860-a5a4-03dcde268c19
extends-slug: page
files: instructions:**/*.person-authority.md
body-shape-slug: empty
named-for: "{person-slug}-{authority-kind}-{target}"
slug: person-authority
plural-slug: person-authorities
domain-parent-slug: domain/person-harness
settled: true
---

# Definition

- **Person authority** — what a person may cause the system to do.

# Design

Each kind of act a person may cause stands as its own domain beneath this one.

Authority to create a thing carries authority over what it created.

An authority covers one kind of act over one area, and a person holding several holds several pages.

An area of `all` is every area, and is the only pattern an authority takes.

# Intent

Every authority a person holds is a page, and every refusal of an act is a read of those pages.
