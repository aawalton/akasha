---
id: 01a01b98-6486-7000-9351-b1b7140d8601
page-type-slug: page-type
title: "Step"
extends-slug: page
files: akasha:**/*.step.md
body-shape-slug: empty
slug: step
domain-parent-slug: page-type/workflow
named-for: "{seq}"
next-seq: 13782
mortal: true
---

# Definition

- **Step** — one run of commands in one container.

# Design

A step carries a gate of its own, so a workflow that runs may dispatch only some of its steps.

A step's file states what it is, and its sidecar holds what it is doing.

A step runs on the cluster, whatever machine drives it.
