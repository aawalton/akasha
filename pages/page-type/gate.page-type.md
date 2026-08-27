---
page-type-slug: page-type
title: "Gate"
id: 36bd610f-213a-5709-abf6-dd936d001122
extends-slug: domain
files: instructions:**/*.gate.md
body-shape-slug: domain
slug: gate
plural-slug: gates
domain-parent-slug: domain/instrument-kind
required-reading-slugs:
  - domain/file-tree
---

# Definition

- **Gate** — an instrument run on a proposed change, ruling on whether it may be made.

# Design

A gate is given the file and its change, and no view of the repo.

A gate reaching past its file reaches the proposed file tree, never the current one.

A gate runs in the command's own process rather than in a hook.

A gate that does not apply says so rather than passing quietly.

Nothing registers a gate but the list it stands in, and that list is read for akasha alone.

Every writer landing in akasha is held by every gate that judges the text.

# Condition

Every gate stands as a page, named for the name it reports under, stating whether it judges the text or the writer.

A change is put through the gates once, whatever number of files it carries.
