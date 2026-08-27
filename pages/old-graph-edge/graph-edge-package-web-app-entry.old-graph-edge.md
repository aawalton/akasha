---
id: 79773532-0c3c-51c9-9a67-a524f4b86883
page-type-slug: old-graph-edge
title: "Graph edge package web app entry"
slug: graph-edge-package-web-app-entry
domain-parent-slug: domain/graph-edge-package
code-type: web-app-entry
roots: true
attributes-slugs:
  - graph-edge-attribute-kind
  - graph-edge-attribute-specifier
---

# Definition

- **Graph edge package web app entry** — the edge from a package to where a web app it carries starts.

# Design

An app directory is one holding both a routes file and a root file, so a package carrying two apps has two.

A route module is named as a string the framework loads, which no import reaches.

The server entry stands beside the app directory rather than inside it.
