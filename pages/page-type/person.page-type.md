---
page-type-slug: page-type
title: "Person"
id: 019fed7c-9f58-7451-8e47-a32d77d97a8c
extends-slug: domain
files: instructions:**/*.person.md
body-shape-slug: domain
slug: person
plural-slug: people
domain-parent-slug: domain/person-harness
settled: true
---

# Definition

- **Person** — a human this system reaches.

# Design

A person is a domain so that a seat can be bound to one.

A person's document carries what serving them takes: the tasks done only for them, the conventions they have given, and the identity they hear from. Every other record of their handler is written from it.

The split against `handler` runs the unintuitive way: procedure for one person sits on that person, rather than under the role that performs it.

