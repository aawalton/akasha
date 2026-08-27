---
id: b3227d63-5a60-5d28-af83-d185cae0bd31
page-type-slug: refusal
title: "Seat documents unread after context loss"
holes:
  - attributes
  - assignment
  - count
  - when
  - source
  - record
---

# Refusal

You are {attributes}.{assignment} {count} document(s) are required reading for you there that you have not read. Your context was replaced at {when} (`{source}`), which discarded every read you had made.

One call names every one of them and reads what one answer holds: `ops read --seat`. What clears the refusal is the read record at `{record}`, which `ops read` opens: one entry per path, naming the body it was read at and when. Run that read, open the record to see what landed, then act again.
