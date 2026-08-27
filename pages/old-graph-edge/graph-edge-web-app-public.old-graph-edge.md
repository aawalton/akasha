---
id: 02f8c990-5f11-4c59-918d-e910d574cdc6
page-type-slug: old-graph-edge
title: "Graph edge web app public"
slug: graph-edge-web-app-public
domain-parent-slug: page-type/old-graph-edge
code-type: web-app-public
roots: true
---

# Definition

- **Graph edge web app public** — the edge from a web app to a file its server hands back as it stands.

# Design

The edge lands on each file under the public directory of the package the app is built from, and on no directory node.

The app's server reads the whole of that directory by request path, so what a file is named by settles nothing about whether the deploy carries it.

A public directory in a package no web app is built from stands outside this edge.
