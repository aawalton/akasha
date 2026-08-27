---
id: 270b9ec6-8e2c-58ed-9420-eead7cb9cd14
page-type-slug: domain
title: "Rules engine match"
slug: rules-engine-match
domain-parent-slug: domain/rules-engine
---

# Definition

- **Rules engine match** — which things a rule applies to.

# Design

A match is a set of conditions, all of which must hold.

A match holding no conditions matches everything.

One match covers another where everything the second matches, the first matches too.

Where covering cannot be decided, the engine answers that it does not.
