---
id: a1e73d79-61bd-4595-8729-3af9305df39e
page-type-slug: old-graph-edge
title: "Graph edge file tested by"
slug: graph-edge-file-tested-by
domain-parent-slug: page-type/old-graph-edge
code-type: tested-by
roots: true
---

# Definition

- **Graph edge file tested by** — the edge from a file to a test file that imports it or opens it beside itself.

# Design

The edge runs from the subject to the test, the reverse of the reference it is read from.

What a test is testing is what it imports, what it opens, and the synth module in its folder; nothing narrows that.

A subject a test imports is a TypeScript file; a subject a test opens is a file of any kind, a script it runs being as much its subject as a module it calls.

An import of a test's that lands on a package rather than on a file draws no edge.

A test importing itself draws no edge.
