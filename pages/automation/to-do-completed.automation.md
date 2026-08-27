---
page-type-slug: automation
id: 019dcaa3-d661-790d-be6f-7a331aa89d0d
title: "To-do completed"
slug: to-do-completed
enabled: true
page-type: to-do
trigger: '{"from":{"kind":"is_empty"},"kind":"property_changed_to","propertyId":"completedAt","to":{"kind":"is_not_empty"}}'
actions: '[{"kind":"create_page","pageTypeSlug":"completed-task","properties":{"category":"= source.category","completedAt":"= source.completedAt","description":"= source.description","dueDate":"= source.dueDate","icon":"= source.icon","link":"= source.link","priority":"= source.priority","rrule":"= source.rrule","taskPageId":"= source.id","title":"= source.title","value":"= source.value"}},{"kind":"patch_source","set":{"completedAt":null,"lastCompletedAt":"= source.completedAt"}},{"kind":"patch_source","set":{"dueDate":"= toCalendarDate(recurrence(source.rrule.anchorFromCompletion && parseCalendarDate(toEsoDay(parseInstant(source.completedAt))) || parseCalendarDate(source.dueDate), source.rrule.rule))"}},{"condition":"= source.rrule.rule == null","kind":"delete_source"}]'
---

Files the round that was finished, clears the tick, rolls the due date on by the recurrence, and removes the to-do where it does not recur.
