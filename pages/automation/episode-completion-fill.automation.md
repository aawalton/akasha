---
page-type-slug: automation
id: 019f143e-68b0-7753-906d-a86909ebcf3b
title: "Episode completion fill"
slug: episode-completion-fill
enabled: true
page-type: episode
trigger: '{"from":{"kind":"is_empty"},"kind":"property_changed_to","propertyId":"completedAt","to":{"kind":"is_not_empty"}}'
actions: '[{"kind":"patch_source","set":{"progress":"=source.length","status":"Completed"}}]'
---

Finishing an episode fills its progress to its length and marks it completed.
