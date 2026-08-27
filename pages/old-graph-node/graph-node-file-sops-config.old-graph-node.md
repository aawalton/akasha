---
id: d1cea96e-3ffc-40e1-a2f1-932739901837
page-type-slug: old-graph-node
title: "Graph node file sops config"
slug: graph-node-file-sops-config
domain-parent-slug: domain/graph-node-file
code-type: sops-config-file
attributes-slugs:
  - graph-node-attribute-path
---

# Definition

- **Graph node file sops config** — the node for one file stating which keys encrypt which paths.

# Design

The file this stands for is named `.sops.yaml` exactly; a file ending `.sops.yaml` behind any other name is an encrypted body and stands as a yaml file.
