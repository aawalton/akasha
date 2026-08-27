---
id: 11678542-5ef9-5226-b4a3-dcfaf2cd1383
slug: ci-admission-ignores-dependency
page-type-slug: finding
title: "CI admission ignores dependency"
domain-slug: page-type/pipeline
---

# Claim

Project #16234's title is the entire record of its observation: CI admission is ordered by pipeline age, which encodes nothing about dependency, so a fix for a resource shortage queues behind the work waiting on it, and the deprioritisation scales with the severity of what it fixes.

# Evidence

Project #16234, domain `pipeline`, status `someday_maybe`, tags `ci`, `dispatcher`, `author:athena`, owner `dalla`. Created 2026-07-25T16:19:16Z.

The project carried no capture text in its notes at all: its retired `notes` attribute was empty on 2026-08-15, when the project file was written from the row. The only content is its title:

"#16234 CI admission is ordered by pipeline age, which encodes nothing about dependency — a fix for a resource shortage queues behind the work waiting on it, and the deprioritisation scales with the severity of what it fixes"

No objective, no measurements, no candidate fix and no provenance beyond the title survive. The project names no `initiative:` in its front matter.
