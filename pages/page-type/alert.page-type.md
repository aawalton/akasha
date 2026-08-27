---
page-type-slug: page-type
title: "Alert"
id: 019ffe7f-0ac8-7000-9b1b-24aebf62c66b
extends-slug: domain
files: akasha:**/*.alert.md
body-shape-slug: domain
slug: alert
domain-parent-slug: page-type/message
---

# Definition

- **Alert** — a message that a watch condition needs attention.

# Design

An alert names the watch condition rather than the watch.

An alert's recipient is resolved on the workstation, not where it fires.

Alert words reach the code that composes the rules through a page query, never through a file read.

A composer that cannot reach the words stops rather than composing an alert without them.

# Intent

Every alert reaches whoever answers for the condition it names.

A firing site names its condition and nothing about who is told.

A firing site sends no message.

An alert's text stands on its own document.

A firing site records `alert.condition.fired` or `alert.condition.cleared`.

An alert event carries its condition slug in `reference_id`.

An alert is matched from the event stream by the condition it names.

Every alert that fires is either acted on or repaired.

A recovery arrives as its own alert.

# Rules

## Direct To Alan

**Push to Alan's phone only where every seat that would escalate is downstream of the failure.**

He stops reading a phone that fires for what a seat could handle, so the real alert lands unread.

Never push because the failure looks severe.

Never route to a seat the failure takes down.
