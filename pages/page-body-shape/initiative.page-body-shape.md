---
page-type-slug: page-body-shape
title: "Initiative"
id: 01a0006f-606c-7000-813f-bfb3544919a5
extends-slug: none
blocks:
  intent:
    repeat: 0-20
  notes:
    count: 0-1
    max: 3xl
  sequence:
    count: 0-1
    repeat: 1-20
    children: 0-15
  loop:
    count: 0-1
    repeat: 1-20
    children: 0-15
choices:
  stages:
    of:
      - sequence
      - loop
    repeat: 0-1
slots:
  intent:
    max: lg
  notes:
    max: 3xl
  stage:
    max: sm
  action:
    max: lg
---

# Intent

- {intent}

# Notes

{notes}

# Sequence

1. **{stage}**
   - {action}

# Loop

1. **{stage}**
   - {action}
