---
page-type-slug: page-type
title: "Automation"
id: 019db533-f381-7476-8d35-dc474796499d
extends-slug: page
files: instructions:**/*.automation.md
body-shape-slug: text
slug: automation
plural-slug: automations
named-for: "{slug}"
domain-parent-slug: domain/page-writes-system
---

# Definition

- **Automation** — a rule that watches one page type for a change and acts when it comes.

# Design

An automation names the page type it watches by slug, and the property it triggers on by key.

An automation on a schedule names no page type.

An automation that is not enabled is loaded by nothing.

An automation's actions run in the order it writes them.

The orchestrator reloads every enabled automation on its own beat rather than on a change.

# Intent

An automation's actions land wherever the page type each one names stands.
