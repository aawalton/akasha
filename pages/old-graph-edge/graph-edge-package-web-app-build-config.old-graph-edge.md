---
id: 9283f8b4-78d0-5bb9-bed7-d8b7c9f83952
page-type-slug: old-graph-edge
title: "Graph edge package web app build config"
slug: graph-edge-package-web-app-build-config
domain-parent-slug: domain/graph-edge-package
code-type: web-app-build-config
---

# Definition

- **Graph edge package web app build config** — the edge from a package to the configuration its web build loads.

# Design

A build configuration stands beside the app directory, in the package the build command runs in.

A configuration standing inside the app directory belongs to a shell bundling that app, and draws no edge here.

The build loads each configuration by a fixed name rather than by a pattern.
