---
page-type-slug: automation
id: 019ddedb-7e30-7561-974f-be948f06e36a
title: "Temper completed task restored"
slug: temper-completed-task-restored
enabled: false
page-type: temper-completed-task
trigger: '{"from":{"kind":"is_empty"},"kind":"property_changed_to","propertyId":"deletedAt","to":{"kind":"is_not_empty"}}'
actions: '[{"kind":"undelete_relation","pageTypeSlug":"temper-task","relationPropertyId":"taskPageId"},{"kind":"patch_relation","pageTypeSlug":"temper-task","relationPropertyId":"taskPageId","set":{"completedAt":null,"dueDate":"= source.dueDate","lastCompletedAt":null}}]'
---

The same restoration for a temper task.
