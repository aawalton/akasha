---
id: f7ae440a-09ba-40e6-a9b8-0416b9f5ce1f
page-type-slug: page-property-definition
title: "File arrangement rule status"
defined-on-slug: page-type/file-arrangement-rule
key: status
type: select(slug)
values:
  - hypothesis
  - coded
  - enforced
computed: true
slug: file-arrangement-rule-status
domain-parent-slug: page-type/file-arrangement-rule
---

# Definition

- **File arrangement rule status** — how far a rule has got toward being enforced.

# Design

A rule's status is read from the check it names, never written on the rule.
