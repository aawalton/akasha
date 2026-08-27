---
id: 01a0458e-dfc8-755c-abdd-46cc4aac3e97
page-type-slug: page-property-definition
title: "Pipeline name"
defined-on-slug: page-type/pipeline
key: name
type: formula
returnType: text
narrows-slug: page
expression: '"{branch}-{commit}" ?? {slug} ?? {id}'
slug: pipeline-name
domain-parent-slug: page-type/pipeline
---

# Definition

- **Pipeline name** — the branch and the commit a pipeline is addressed by.
