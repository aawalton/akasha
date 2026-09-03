---
page-type-slug: page-property-definition
title: "Old ops command command path"
id: 019ffe98-b852-7006-bc6e-4ac4b50f5d06
defined-on-slug: page-type/old-ops-command
key: command-path
type: file
pattern: '^(?:tools/(?:commands/(?:[a-z0-9-]+/)*)?[a-z0-9-]+\.ts|ops-cli/(?:[a-z0-9-]+/)+[a-z0-9-]+\.command\.code\.attachment\.ts)$'
backstop: 60
required: true
slug: old-ops-command-command-path
domain-parent-slug: page-type/old-ops-command
---

# Definition

- **Old ops command command path** — the one file a command runs.

# Design

A command runs a file under `tools/`, or the code attachment of a command page under `ops-cli/`.
