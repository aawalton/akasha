---
page-type-slug: automation
id: 019dcaa3-e522-7a53-b8d1-d5e183d8caee
title: "Temper task completed"
slug: temper-task-completed
enabled: false
page-type: temper-task
trigger: '{"from":{"kind":"is_empty"},"kind":"property_changed_to","propertyId":"completedAt","to":{"kind":"is_not_empty"}}'
actions: '[{"kind":"create_page","pageTypeSlug":"temper-completed-task","properties":{"character":"= source.character","completedAt":"= source.completedAt","completionCardId":"= source.completionCardId","completionItemPath":"= source.completionItemPath","description":"= source.description","dueDate":"= source.dueDate","icon":"= source.icon","link":"= source.link","rrule":"= source.rrule","scope":"= source.scope","taskPageId":"= source.id","title":"= source.title"}},{"kind":"patch_source","set":{"completedAt":null,"lastCompletedAt":"= source.completedAt"}},{"kind":"patch_source","set":{"dueDate":"= toCalendarDate(recurrence(source.rrule.anchorFromCompletion && parseCalendarDate(toEsoDay(parseInstant(source.completedAt))) || parseCalendarDate(source.dueDate), source.rrule.rule))"}},{"condition":"= source.rrule.rule == null","kind":"delete_source"}]'
---

The same round for a temper task: file the completion, clear the tick, roll the due date, remove what does not recur.
