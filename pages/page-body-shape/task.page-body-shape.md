---
page-type-slug: page-body-shape
title: "Task"
id: 01a0006c-2ae9-7000-ae1e-3c922743708d
extends-slug: domain
blocks:
  sequence:
    count: 0-1
    repeat: 1-12
    children: 1-15
  loop:
    count: 0-1
    repeat: 1-12
    children: 1-15
  invariants:
    count: 0-1
    max: 2xl
choices:
  stages:
    of:
      - sequence
      - loop
    repeat: 1
slots:
  stage:
    max: sm
  action:
    max: lg
  invariant:
    max: 2xl
---

# Sequence

1. **{stage}**
   - {action}

# Loop

1. **{stage}**
   - {action}

# Invariants

{invariant}
