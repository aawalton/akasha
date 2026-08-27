---
page-type-slug: automation
id: 019e8896-4ae1-702a-8a67-aab5ddda0541
title: Error fix deployed resolved
slug: error-fix-deployed-resolved
enabled: false
trigger: "{\"kind\":\"schedule\",\"resetDomain\":\"eso-na\",\"rrule\":\"FREQ=DAILY\"}"
actions: "[{\"condition\":\"= parseInstant(match.updatedAt) < now() - 86400000\",\"kind\":\"patch_matching\",\"pageTypeSlug\":\"error\",\"set\":{\"status\":\"resolved\"},\"where\":[{\"eq\":\"fixDeployed\",\"key\":\"status\"}]}]"
---

Closes an error a day after its fix was deployed, on the reasoning that a day without a recurrence is a fix that held.
