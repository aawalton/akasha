---
id: 01a01b92-bd99-7000-a355-21db18e7db4b
page-type-slug: page-type
title: "Pipeline"
extends-slug: page
files: memory:**/*.pipeline.md
body-shape-slug: empty
slug: pipeline
domain-parent-slug: domain/change-harness-cluster
required-reading-slugs:
  - repo/memory-repo
named-for: "{branch}-{commit}"
next-seq: 101
mortal: true
---

# Definition

- **Pipeline** — one run of the workflows a commit needs.

# Design

Each worker reads the authoritative pages on every tick and takes events as acceleration only, rather than consuming an event log.

A workflow whose watched files resolve to nothing fails rather than falling back to the commit.

A failure is cured only by a later run of the same workflow on the same branch completing, never by a newer commit landing behind it.

A step's script is one argument to `sh`.

Kubernetes writes `Error` as a container's terminated reason for a nonzero exit with no known cause.

# Intent

A pipeline's definition is fixed by one commit in each repository it reads.

One writer moves a step page, never both the dispatcher and the step itself.

What a check builds is reused by the main pipeline rather than built a second time, unless reuse would serve an answer that has since moved.

What a check builds is removed once no pipeline will read it again.

