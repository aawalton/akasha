---
id: 7ce157cc-d88e-5e18-9687-352267f8e963
page-type-slug: old-graph-edge
title: "Graph edge inference service source"
slug: graph-edge-inference-service-source
domain-parent-slug: page-type/old-graph-edge
code-type: inference-service-source
---

# Definition

- **Graph edge inference service source** — the edge from a service to a file under the directory it copies.

# Design

The edge lands on every file under the directory, not just the entry the service runs.

Shell and Python files travel too, and no import edge reaches them.

A file of a kind the graph registers no node for carries no edge and stays unrooted.

The edge lands on files, never the package holding them, which only does the copying.

This edge leaves rooted files inside a package nothing else roots — the state a file-to-package rooting edge acts on.
