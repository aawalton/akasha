---
id: e0628116-6136-5fe9-8bee-8986ec63170b
page-type-slug: old-ops-command
title: "Ops check-held-addon-structure"
slug: ops-check-held-addon-structure
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - page-type/cluster-check
  - page-type/old-ops-command
command-path: tools/commands/check-held-addon-structure.ts
path: check-held-addon-structure
---

# Definition

- **Ops check-held-addon-structure** — ruling that the territory map and the addon tree name the same addons in the same places.

# Design

The territory map this rules against stands in this repository; the addon roster it holds the map against stands in the code checkout named.

An empty roster withholds the verdict rather than passing, a map held against nothing reading as a clean answer.

# Help

Take the addon roster the code checkout discovers, union it with the addons the territory map names,
and rule on every addon in that union: the map's recorded package is where the roster finds it, and
every generated file under an addon's package sits inside a generated directory.

The union is what makes both directions visible. A map entry for an addon the roster no longer finds
is stale, and an addon the roster finds at a different package is one the map was not repointed for
when the tree moved.
