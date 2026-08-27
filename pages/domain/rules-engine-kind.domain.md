---
id: bcdf876e-0f13-5637-ba7f-b0834d8f4bd9
page-type-slug: domain
title: "Rules engine kind"
slug: rules-engine-kind
domain-parent-slug: domain/rules-engine
---

# Definition

- **Rules engine kind** — who carries out a rule: code or an agent.

# Design

A rule's kind does not change how it matches.

A code rule states the actions to take; an agent rule leaves the final action to the agent.

A rule's kind is the folder it stands in rather than a key on it.

The engine names the rule that matched and carries nothing out.
