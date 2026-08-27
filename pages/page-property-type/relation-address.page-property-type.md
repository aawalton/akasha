---
id: 9111a743-07df-507b-91f3-029065c009a4
page-type-slug: page-property-type
title: "Relation address"
type-slug: relation-address
kind: primitive
slug: relation-address
domain-parent-slug: domain/page-property-type-primitive
---

# Definition

- **Relation address** — another page, named by its page type and its slug.

# Design

A relation whose values may be of more than one page type is a relation address.

A relation address carries its page type in the value, joined to the slug by a slash.

A target on the definition bounds which page types a value may name, rather than standing in for the one the value states.
