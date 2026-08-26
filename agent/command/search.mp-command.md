---
id: 01a04079-36e4-7000-8007-d844408a7258
page-type-slug: mp-command
title: "Search"
slug: search
path: search
domain-parent-slug: domain/master-plan
required-reading-slugs:
  - page-type/mp-command
---

# Definition

- **Search** — ripgrep over one repository or all of them.

# Design

A search records no reading.

A search changes ripgrep's defaults and takes none of its flags away.

No search can exhaust the memory of the agent that ran it.

A search that stopped says so, and what it never looked at.

A search with nothing narrowing it reaches every repository.

A search given a path searches only there.

Which arguments are paths depends on the ripgrep version pinned here.
