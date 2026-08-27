---
id: 6141cd51-6a06-525d-9069-d8e7abadf0ca
page-type-slug: finding
title: "Completion claims two pushes"
domain-slug: page-type/notification
---

# Claim

Every project reaching `done` writes two claims into `public.apns_push_log`, about one second apart: a `project.done` claim, then a `notification.created` claim on a different row carrying the same project title. Whether both result in a push reaching the phone is not established here.

# Evidence

Measured across six hours on 2026-08-17. Every `project.done` claim in the window has a `notification.created` partner, and none stands alone.

    21:54:01  project.done          #19372 Strip the terminal seat footer...
    21:54:02  notification.created  #19372 Strip the terminal seat footer...
    21:25:49  project.done          #19323 Port the model gateway...
    21:25:49  notification.created  #19323 Port the model gateway...
    21:06:30  project.done          #19370 The page query evaluator...
    21:06:31  notification.created  #19370 The page query evaluator...

The second row of each pair joins to a `notification` page whose title is the project's own.

The two are not one producer writing twice under different names: `notification.created` also fires with no `project.done` beside it, as at 18:58 for "Alert undelivered".

The table is named for pushes, which is why this is worth opening. Nothing measured here proves two arrivals on the phone rather than one, and that is the question whoever picks this up should settle first.
