---
id: ce1e1055-b3c1-5661-b0d3-40614ecae587
page-type-slug: page-property-definition
title: "Message warrant"
defined-on-slug: page-type/message
key: warrant
type: select(lower-kebab-case)
values:
  - announce
  - blocked
required: true
slug: message-warrant
domain-parent-slug: page-type/message
---

# Definition

- **Message warrant** — whether a message's sender is waiting for an answer.

# Design

A warrant is stated by its sender, never defaulted from who is sending.

A warrant says nothing about its recipient.
