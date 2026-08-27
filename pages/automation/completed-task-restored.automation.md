---
page-type-slug: automation
id: 019ddedb-6d48-7f89-bc8e-1f06d2da5f52
title: "Completed task restored"
slug: completed-task-restored
enabled: true
page-type: completed-task
trigger: '{"from":{"kind":"is_empty"},"kind":"property_changed_to","propertyId":"deletedAt","to":{"kind":"is_not_empty"}}'
actions: '[{"kind":"undelete_relation","pageTypeSlug":"to-do","relationPropertyId":"taskPageId"},{"kind":"patch_relation","pageTypeSlug":"to-do","relationPropertyId":"taskPageId","set":{"completedAt":null,"dueDate":"= source.dueDate","lastCompletedAt":null}}]'
---

Undoing a completion puts the to-do back: the completed task is restored, and the to-do it came from returns uncompleted on the due date it carried.
