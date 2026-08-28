---
id: 01a047c8-d167-7e81-b2dc-fd5adc1cf6b2
page-type-slug: all-about-alan-topic
title: "What Changes When I Change A Doc"
slug: what-changes-when-i-change-a-doc
topic-parents-slugs: when-my-docs-are-my-code
topic-related-slugs:
  - the-graph-i-built-to-run-my-checks
---

# Definition

- **What Changes When I Change A Doc** — what a documentation change sets off, and how I work out how far it reaches

# Design

Running the code off the documentation helps keep them aligned.

When the documentation changes, the code might change.

I need granular cache invalidation at scale, so I can answer questions like "with this file change, which checks need to run and which services need to deploy?"

That answer comes primarily from a set of git oids and some cached edges between nodes in the graph system.

# Questions

What the invalidation still gets wrong, and how I would find out, is unrecorded.
