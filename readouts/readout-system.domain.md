---
id: 2d1074d0-e426-5e7f-a407-c20377e790a4
page-type-slug: domain
title: "Readout system"
slug: readout-system
domain-parent-slug: domain/person-tools
---

# Definition

- **Readout system** — how a person is shown what is true.

# Design

A readout keeps the last body it was given when its feed stops, and drops it when refused.

A row a readout cannot read costs its own reading only.

Readouts refresh on their own schedules and can disagree about one number at one moment.

A readout's color tracks progress toward done; a status badge's tracks kind.

A readout leaves out everything but the reading itself.

A readout draws however many readings its feed sends, and refuses only a feed that sends none.

# Intent

The store answers with numbers, and every color is worked out outside it.

A readout is read rather than interrogated: what its reader wants from it costs them a glance and no sorting, arithmetic or recall.

A readout's reader is never the instrument that catches it being wrong.

# Rules

## Field Retirement

**Drop a field from a readout before its feed stops sending it.**

A shipped build reads the payload it was built against, and nothing reports the tile you strand.

Wait for the old build to leave every device.

Treat a rename or an emptied key as a drop.

## Device Conditions

**Draw a readout in its instrument under the conditions the device draws it under.**

A tile that clips on the phone passes in the instrument's own frame, so a reader finds it first.

Replace the references taken in the old frame.

Match the text size and the dark setting too.
