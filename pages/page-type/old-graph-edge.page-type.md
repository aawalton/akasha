---
page-type-slug: page-type
title: "Old graph edge"
id: 01a000ec-c5b7-7143-99ac-631c9b536dff
extends-slug: domain
files: akasha:**/*.old-graph-edge.md
body-shape-slug: domain
slug: old-graph-edge
domain-parent-slug: domain/the-graph
---

# Definition

- **Old graph edge** — one link from one node to another.

# Design

An edge type's declared endpoints are not always the endpoints it carries.

An edge type can be registered without its name standing at the registration.

# Intent

An edge type's declared endpoints are the endpoints it carries.

Every edge type's name stands where it is registered.

An edge type's name in code is its domain's slug.
