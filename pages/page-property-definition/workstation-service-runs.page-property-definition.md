---
id: bacea0ac-75cb-5ad1-a0fa-6761cb77aeac
page-type-slug: page-property-definition
title: "Workstation service runs"
defined-on-slug: page-type/workstation-service
key: runs
type: list(text)
required: true
slug: workstation-service-runs
domain-parent-slug: page-type/workstation-service
---

# Definition

- **Workstation service runs** — the command lines a workstation service executes, in order.

# Design

A command line written with a leading `-` is one whose failure the service passes over.
