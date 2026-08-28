---
id: 01a04615-3060-7c9d-baa6-90b37783964f
page-type-slug: all-about-alan-topic
title: "When My Docs Are My Code"
slug: when-my-docs-are-my-code
topic-parents-slugs: why-i-keep-my-data-in-files
---

# Definition

- **When My Docs Are My Code** — what changes once my data, my docs and my code are one thing

# Design

More of the system is defined in structured agent-readable documents, and in many cases the code runs directly off the documentation.

Running the code off the documentation helps keep them aligned.

When the documentation changes, the code might change.

I need granular cache invalidation at scale, so I can answer questions like "with this file change, which checks need to run and which services need to deploy?"

That answer comes primarily from a set of git oids and some cached edges between nodes in the graph system.

Data, docs and code being the same thing is a whole different universe from where software products have lived in the past, with the three separate.

It is necessary. When the system is primarily agent-driven, all three need to be agent-accessible first, and all other considerations are secondary.

# Questions

The graph system is another system I have not seen anyone else build. I named it and said we could talk about it sometime, and it has no write-up.

What else falls out of the new constraints that the old system could not have given me at any price is what I am still figuring out.
